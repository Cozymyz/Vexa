# code_generator_incremental_enhanced.py
import yaml
import os
import re
import inflection
from jinja2 import Environment, FileSystemLoader
from datetime import datetime
from pathlib import Path
import hashlib


def state_attribute_name(s):
    """Convert module names to camelCase plural form (MenuGroup -> menuGroups)"""
    if s.islower() or '_' not in s and s[0].isupper() and s[1:].islower():
        return s.lower() + "List"
    else:
        plural = inflection.pluralize(s)
        return inflection.camelize(plural, False)


def singular(s):
    """Get the module list number format (MenuGroups -> MenuGroup)"""
    return inflection.singularize(s)


def upper_underscore(s):
    """Convert module names to uppercase underscores (MenuGroup -> MENU_GROUP)"""
    return inflection.underscore(s).upper()


# Configuration Difference Analysis
def compute_config_diff(old_config, new_config):
    """
    Compare the old and new YAML configurations and return the affected modules and components
    Return: {
        'modules': {
            'added': [module_name, ...],
            'removed': [module_name, ...],
            'modified': [module_name, ...]  # Modules whose definitions change
        },
        'components': {
            'added': [component_name, ...],
            'removed': [component_name, ...],
            'modified': [component_name, ...]  # Related modules or components that have undergone self-defined changes
        }
    }
    """
    diff = {
        'modules': {'added': [], 'removed': [], 'modified': []},
        'components': {'added': [], 'removed': [], 'modified': []}
    }

    old_modules = old_config.get('modules', {})
    new_modules = new_config.get('modules', {})
    old_components = old_config.get('components', {})
    new_components = new_config.get('components', {})

    # Analysis module differences
    all_module_names = set(old_modules.keys()) | set(new_modules.keys())
    for name in all_module_names:
        if name in new_modules and name not in old_modules:
            diff['modules']['added'].append(name)
        elif name in old_modules and name not in new_modules:
            diff['modules']['removed'].append(name)
        else:
            # If the module exists, check if its content has changed
            old_hash = hashlib.md5(str(old_modules[name]).encode()).hexdigest()
            new_hash = hashlib.md5(str(new_modules[name]).encode()).hexdigest()
            if old_hash != new_hash:
                diff['modules']['modified'].append(name)

    # Analysis component differences
    all_component_names = set(old_components.keys()) | set(new_components.keys())
    for name in all_component_names:
        if name in new_components and name not in old_components:
            diff['components']['added'].append(name)
        elif name in old_components and name not in new_components:
            diff['components']['removed'].append(name)
        else:
            # If the component exists, check if its associated module list or other configurations have changed
            old_hash = hashlib.md5(str(old_components[name]).encode()).hexdigest()
            new_hash = hashlib.md5(str(new_components[name]).encode()).hexdigest()
            if old_hash != new_hash:
                diff['components']['modified'].append(name)
            else:
                # Even if the component definition remains unchanged
                # it should still be marked as affected if the modules it depends on change
                comp_modules = [m['name'] for m in new_components[name].get('modules', [])]
                for mod_name in comp_modules:
                    if mod_name in diff['modules']['added'] + diff['modules']['modified'] + diff['modules']['removed']:
                        diff['components']['modified'].append(name)
                        break

    return diff


#Tag-based code merging
def merge_file_with_generated_blocks(file_path, new_generated_content, block_id_prefix=""):
    """
    Intelligent file merging
    Replaces the old content within the corresponding marked blocks in the file with new_generated_content,
    while preserving all user code outside the marked blocks
    """
    if not os.path.exists(file_path):
        # If the file does not exist, use the newly generated content directly
        return new_generated_content, True

    with open(file_path, 'r', encoding='utf-8') as f:
        old_content = f.read()

    # match <!-- GENERATED_CONTENT_START:block_id -->  <!-- GENERATED_CONTENT_END:block_id -->
    # or // GENERATED_CONTENT_START:block_id ... // GENERATED_CONTENT_END:block_id
    pattern = re.compile(
        r'(?P<start_marker>(?:<!--|//)\s*GENERATED_CONTENT_START:' + re.escape(
            block_id_prefix) + r'?(?P<block_id>\w+)\s*(?:-->)?)\s*'
                               r'(?P<old_block>.*?)'
                               r'(?P<end_marker>(?:<!--|//)\s*GENERATED_CONTENT_END:' + re.escape(
            block_id_prefix) + r'?(?P=block_id)\s*(?:-->)?)',
        re.DOTALL
    )

    # Extract all marked blocks from the newly generated content:
    # {block_id: complete block content (including markers)}
    new_blocks = {}
    for match in pattern.finditer(new_generated_content):
        block_id = match.group('block_id')
        new_blocks[block_id] = match.group(0)  # The entire text including start and end markers

    if not new_blocks:
        # The new content contains no marked blocks
        # so the old content is returned directly
        return old_content, False

    # Find and replace each marked block in the old content
    merged_content = old_content
    file_modified = False

    for block_id, new_block_full in new_blocks.items():
        # Search for blocks with the same ID in the old content
        old_pattern = re.compile(
            r'(?P<start_marker>(?:<!--|//)\s*GENERATED_CONTENT_START:' + re.escape(block_id) + r'\s*(?:-->)?)\s*'
                                                                                               r'(?P<old_block>.*?)'
                                                                                               r'(?P<end_marker>(?:<!--|//)\s*GENERATED_CONTENT_END:' + re.escape(
                block_id) + r'\s*(?:-->)?)',
            re.DOTALL
        )
        old_match = old_pattern.search(merged_content)

        if old_match:
            # Find the old block and replace it
            merged_content = merged_content.replace(old_match.group(0), new_block_full)
            file_modified = True
            print(f"    🔄 Updated marker block: {block_id}")
        else:
            # No old block found (e.g., a newly added block), attempting to insert at the end of the file (tentative)
            print(f"    ⚠️  block not found '{block_id}'，It has been appended to the end of the file.")
            merged_content = merged_content + "\n\n" + new_block_full
            file_modified = True

    return merged_content, file_modified


# Incremental generation of Vuex modules
def generate_module_incremental(template, module_config, output_dir, old_config_hash=None):
    """Generate or incrementally update a single module file"""
    context = {
        'module': module_config,
        'fields': module_config.get('fields', {}),
        'now': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    # Render the complete new content containing the tags
    new_content_full = template.render(context)

    module_name = module_config['name']
    output_file = f"{output_dir}/{module_name}.js"

    # Intelligent merging
    final_content, was_modified = merge_file_with_generated_blocks(output_file, new_content_full)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(final_content)

    if was_modified:
        print(f"    ✅ Module files updated: {module_name}.js (Incremental merging)")
    else:
        print(f"    ⏭️ The module file has not been changed and has been skipped: {module_name}.js")


def generate_vuex_modules_incremental(old_config, new_config, output_dir, diff):
    """
    Incremental generation of Vuex modules
    Only new and modified modules are processed
    Nnchanged modules are skipped
    """
    os.makedirs(output_dir, exist_ok=True)

    env = Environment(loader=FileSystemLoader('templates'))
    env.filters['state_attribute_name'] = state_attribute_name
    env.filters['singular'] = singular
    env.filters['upper_underscore'] = upper_underscore
    template = env.get_template('vuex_module_template.j2')

    modules_to_process = set(diff['modules']['added'] + diff['modules']['modified'])

    print(f"\n🔧 Processing Vuex modules ({len(modules_to_process)} items need updating):")
    for module_name in modules_to_process:
        if module_name in new_config.get('modules', {}):
            print(f"  📦 Processing Vuex modules: {module_name}")
            module_config = new_config['modules'][module_name].copy()
            module_config['name'] = module_name
            generate_module_incremental(template, module_config, output_dir)

    # Handling deleted modules: Options include deleting files or commenting out warnings.
    for module_name in diff['modules']['removed']:
        file_to_remove = f"{output_dir}/{module_name}.js"
        if os.path.exists(file_to_remove):
            # Backup files instead of deleting them directly
            os.rename(file_to_remove, f"{file_to_remove}.backup")
            print(f"    🗑️  The module has been removed; the original file has been backed up: {module_name}.js.backup")


# Incremental generation of Vue components
def generate_vue_component_incremental(template, component_config, all_modules_config, output_dir, component_name):
    """Generate or incrementally update a single component file"""
    # Extract the module configuration associated with the component
    modules = []
    if 'modules' in component_config:
        for module_item in component_config['modules']:
            module_name = module_item['name']
            if module_name in all_modules_config:
                full_module_config = all_modules_config[module_name].copy()
                full_module_config['name'] = module_name
                full_module_config['singular'] = inflection.singularize(module_name)
                full_module_config['fetch_action'] = 'fetch' + full_module_config['singular']
                full_module_config['skip_if_exists'] = (full_module_config.get('extent') == 'session')
                modules.append(full_module_config)

    context = {
        'component_name': os.path.splitext(component_name)[0],
        'modules': modules,
        'has_multiple_modules': len(modules) > 1,
        'now': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    new_content_full = template.render(context)
    output_file = f"{output_dir}/{component_name}"

    # Intelligent merging
    final_content, was_modified = merge_file_with_generated_blocks(output_file, new_content_full, block_id_prefix="")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(final_content)

    if was_modified:
        print(f"    ✅ Component files updated: {component_name} (Incremental merging)")
    else:
        print(f"    ⏭️ The component files have not changed and have been skipped: {component_name}")


def generate_vue_components_incremental(old_config, new_config, output_dir, diff):
    """
    Incremental generation of Vue components
    Only new and modified components are processed
    Unchanged components are skipped
    """
    os.makedirs(output_dir, exist_ok=True)

    env = Environment(loader=FileSystemLoader('templates'))
    env.filters['singularize'] = inflection.singularize
    env.filters['pluralize'] = inflection.pluralize
    env.filters['camelize'] = inflection.camelize
    template = env.get_template('vue_component_template.j2')

    components_to_process = set(diff['components']['added'] + diff['components']['modified'])

    print(f"\n🔧 Processing Vue components ({len(components_to_process)} items need updating):")
    for comp_name in components_to_process:
        if comp_name in new_config.get('components', {}):
            print(f"  📦 processing component: {comp_name}")
            if not comp_name.endswith('.vue'):
                comp_name += '.vue'
            generate_vue_component_incremental(template, new_config['components'][comp_name],
                                               new_config.get('modules', {}), output_dir, comp_name)

    # Handling deleted components
    for comp_name in diff['components']['removed']:
        if not comp_name.endswith('.vue'):
            comp_name += '.vue'
        file_to_remove = f"{output_dir}/{comp_name}"
        if os.path.exists(file_to_remove):
            os.rename(file_to_remove, f"{file_to_remove}.backup")
            print(f"    🗑️  The component has been removed; the original file has been backed up: {comp_name}.backup")


def generate_module(template, module_config, output_dir):
    # Preparing the context
    context = {
        'module': module_config,
        'fields': module_config.get('fields', {}),
        'now': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    rendered = template.render(context)

    # Generate output file name
    module_name = module_config['name']
    output_file = f"{output_dir}/{module_name}.js"

    # Writing file
    with open(output_file, 'w') as f:
        f.write(rendered)

    print(f"✅ Successfully generated {module_name} module: {output_file}")


def generate_vuex_modules(yaml_file, output_dir):
    os.makedirs(output_dir, exist_ok=True)

    with open(yaml_file, 'r') as f:
        config = yaml.safe_load(f)

    env = Environment(loader=FileSystemLoader('templates'))
    env.filters['state_attribute_name'] = state_attribute_name
    env.filters['singular'] = singular
    env.filters['upper_underscore'] = upper_underscore

    # Rendering Templates
    template = env.get_template('vuex_module_template.j2')

    if 'modules' not in config:
        print("⚠️ Warning: There is no 'modules' section in the YAML configuration")
        return

    # Processing all modules from the top-level modules section
    for module_name, module_config in config['modules'].items():
        print(f"Processing module: {module_name}, generating vuex module")

        # Add the module name to the config
        module_config['name'] = module_name
        generate_module(template, module_config, output_dir)


def generate_vue_components(yaml_file, output_dir):
    os.makedirs(output_dir, exist_ok=True)

    with open(yaml_file, 'r') as f:
        config = yaml.safe_load(f)

    env = Environment(loader=FileSystemLoader('templates'))
    env.filters['singularize'] = inflection.singularize
    env.filters['pluralize'] = inflection.pluralize
    env.filters['camelize'] = inflection.camelize

    # Rendering Templates
    template = env.get_template('vue_component_template.j2')

    if 'components' not in config:
        print("⚠️ Warning: There is no 'components' section in the YAML configuration")
        return

    if 'modules' not in config:
        print("⚠️ Warning: There is no 'modules' section in the YAML configuration")
        return

    for component_name, component_config in config['components'].items():
        # Make sure your component file name ends with '.vue'
        if not component_name.endswith('.vue'):
            component_name += '.vue'

        # Skip empty configuration
        if not component_config:
            print(f"⚠️ Skip empty configuration: {component_name}")
            continue

        print(f"Processing component: {component_name}, generating vue component")

        # Extract module configurations from component configuration
        modules = []

        # Handling modules list in component configuration
        if 'modules' in component_config:
            # Each module configuration is a dictionary containing 'name' field
            for module_item in component_config['modules']:
                module_name = module_item['name']

                if module_name in config['modules']:
                    # Get top-level module configuration
                    full_module_config = config['modules'][module_name].copy()
                    full_module_config['name'] = module_name

                    # Preprocessing module name
                    full_module_config['singular'] = inflection.singularize(module_name)
                    # full_module_config['plural'] = inflection.pluralize(full_module_config['singular'])
                    full_module_config['fetch_action'] = 'fetch' + full_module_config['singular']

                    # Set the 'skip_if_exists' flag according to 'extent'
                    full_module_config['skip_if_exists'] = (full_module_config.get('extent') == 'session')

                    modules.append(full_module_config)
                else:
                    print(f"⚠️ Warning: Module '{module_name}' not found in top-level modules section")
        else:
            print(f"⚠️ Warning: No modules found for {component_name}")
            continue

        if not modules:
            print(f"⚠️ Warning: No valid modules found for {component_name}")
            continue

        # Preparing the context
        context = {
            'component_name': os.path.splitext(component_name)[0],
            'modules': modules,
            'has_multiple_modules': len(modules) > 1,
            'now': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        rendered = template.render(context)

        output_file = f"{output_dir}/{component_name}"

        with open(output_file, 'w') as f:
            f.write(rendered)

        print(f"✅ Successfully generated {component_name} component: {output_file}")


# Incremental update Main function
def generate_incremental(old_yaml_path, new_yaml_path, output_dir_modules, output_dir_components):
    """
    Incremental update Main function
    """
    # Load new configuration
    with open(new_yaml_path, 'r', encoding='utf-8') as f:
        new_config = yaml.safe_load(f)

    # Analyze the difference
    if old_yaml_path and os.path.exists(old_yaml_path):
        with open(old_yaml_path, 'r', encoding='utf-8') as f:
            old_config = yaml.safe_load(f)
        print("📊 Analyze configuration differences...")
        diff = compute_config_diff(old_config, new_config)
        print(
            f"   Module - Added: {diff['modules']['added']}, Removed: {diff['modules']['removed']}, Modified: {diff['modules']['modified']}")
        print(
            f"   Component - Added: {diff['components']['added']}, Removed: {diff['components']['removed']}, Modified: {diff['components']['modified']}")

        # Incremental generation modules and components
        generate_vuex_modules_incremental(old_config if 'old_config' in locals() else {}, new_config,
                                          output_dir_modules,
                                          diff)
        generate_vue_components_incremental(old_config if 'old_config' in locals() else {}, new_config,
                                            output_dir_components, diff)

        print("\n🎉 Incremental code generation complete")
        print("Note: The code block marked 'GENERATED_CONTENT' has been updated according to the new configuration")
        print("  All user code located outside the marked block has been preserved ")

    else:
        print("⚠️  No old configuration file found; full generation will be performed")
        diff = {
            'modules': {'added': list(new_config.get('modules', {}).keys()), 'removed': [], 'modified': []},
            'components': {'added': list(new_config.get('components', {}).keys()), 'removed': [], 'modified': []}
        }

        # Original full generation function
        generate_vuex_modules(new_yaml_path, output_dir_modules)
        generate_vue_components(new_yaml_path, output_dir_components)


if __name__ == "__main__":
    
    OLD_CONFIG = "config/Vexa.yaml"  # old config
    NEW_CONFIG = "config/Vexa_v4.yaml"  # new config
    OUTPUT_DIR_MODULES = "output/modules/incrementalv4"
    OUTPUT_DIR_COMPONENTS = "output/components/incrementalv4"

    generate_incremental(OLD_CONFIG, NEW_CONFIG, OUTPUT_DIR_MODULES, OUTPUT_DIR_COMPONENTS)