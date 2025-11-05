import yaml
import os
import inflection
from jinja2 import Environment, FileSystemLoader
from datetime import datetime


# Custom Jinja2 Filters
def state_attribute_name(s):
    """Convert module names to camelCase plural form (MenuGroup -> menuGroups)"""
    # Check if it is a single word
    if s.islower() or '_' not in s and s[0].isupper() and s[1:].islower():
        # Single Word：Lower case + "List"
        return s.lower() + "List"
    else:
        # Multi-word ：CamelCase plural form
        plural = inflection.pluralize(s)
        return inflection.camelize(plural, False)


def singular(s):
    """Get the module list number format (MenuGroups -> MenuGroup)"""
    # More complex singular-plural conversions may be required in actual projects
    return inflection.singularize(s)


def upper_underscore(s):
    """Convert module names to uppercase underscores (MenuGroup -> MENU_GROUP)"""
    # s = re.sub(r'(.)([A-Z][a-z]+)', r'\1_\2', s)
    # s = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', s)
    return inflection.underscore(s).upper()


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
            # 每个模块配置是一个字典，包含name字段
            for module_item in component_config['modules']:
                module_name = module_item['name']

                if module_name in config['modules']:
                    # 获取顶层模块配置
                    full_module_config = config['modules'][module_name].copy()
                    full_module_config['name'] = module_name

                    # 预处理模块名称
                    full_module_config['singular'] = inflection.singularize(module_name)
                    # full_module_config['plural'] = inflection.pluralize(full_module_config['singular'])
                    full_module_config['fetch_action'] = 'fetch' + full_module_config['singular']

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

if __name__ == "__main__":

    yaml_file = "config/Vexa.yaml"

    output_dir_modules = "output/modules"
    output_dir_components = "output/components"

    generate_vuex_modules(yaml_file, output_dir_modules)
    generate_vue_components(yaml_file, output_dir_components)