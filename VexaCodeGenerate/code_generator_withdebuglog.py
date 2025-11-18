import yaml
import os
import inflection
import json
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
    return inflection.underscore(s).upper()


def save_debug_data(data, filename, output_dir):
    """Save debug data to a JSON file"""
    debug_dir = os.path.join(output_dir, "debug")
    os.makedirs(debug_dir, exist_ok=True)

    debug_file = os.path.join(debug_dir, f"{filename}.json")

    # Handling unserializable objects
    def default_serializer(obj):
        if hasattr(obj, '__dict__'):
            return obj.__dict__
        elif isinstance(obj, datetime):
            return obj.isoformat()
        else:
            return str(obj)

    with open(debug_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False, default=default_serializer)

    print(f"🔍 Debug data has been saved: {debug_file}")


def generate_module(template, module_config, output_dir):
    # Save module configuration debugging information
    save_debug_data({
        'module_config': module_config,
        'fields': module_config.get('fields', {}),
        'filters_applied': {
            'state_attribute_name': state_attribute_name(module_config['name']),
            'singular': singular(module_config['name']),
            'upper_underscore': upper_underscore(module_config['name'])
        }
    }, f"module_{module_config['name']}_config", output_dir)

    # Preparing the context
    context = {
        'module': module_config,
        'fields': module_config.get('fields', {}),
        'now': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    # Save template context
    save_debug_data(context, f"module_{module_config['name']}_context", output_dir)

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

    # Save the complete YAML configuration
    save_debug_data(config, "full_yaml_config", output_dir)

    env = Environment(loader=FileSystemLoader('templates'))
    env.filters['state_attribute_name'] = state_attribute_name
    env.filters['singular'] = singular
    env.filters['upper_underscore'] = upper_underscore

    # Save filter test results
    filter_test = {}
    if 'modules' in config:
        for module_name in config['modules'].keys():
            filter_test[module_name] = {
                'state_attribute_name': state_attribute_name(module_name),
                'singular': singular(module_name),
                'upper_underscore': upper_underscore(module_name)
            }
    save_debug_data(filter_test, "filter_test_results", output_dir)

    # Rendering Templates
    template = env.get_template('vuex_module_template.j2')

    if 'modules' not in config:
        print("⚠️ Warning: There is no 'modules' section in the YAML configuration")
        return

    # Save module list
    save_debug_data({
        'module_names': list(config['modules'].keys()),
        'modules_count': len(config['modules'])
    }, "modules_summary", output_dir)

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

    # Save component configuration summary
    components_summary = {
        'component_names': list(config['components'].keys()),
        'components_count': len(config['components']),
        'modules_available': list(config['modules'].keys())
    }
    save_debug_data(components_summary, "components_summary", output_dir)

    for component_name, component_config in config['components'].items():
        # Make sure your component file name ends with '.vue'
        if not component_name.endswith('.vue'):
            component_name += '.vue'

        # Skip empty configuration
        if not component_config:
            print(f"⚠️ Skip empty configuration: {component_name}")
            continue

        print(f"Processing component: {component_name}, generating vue component")

        # Save original component configuration
        save_debug_data({
            'component_name': component_name,
            'raw_component_config': component_config
        }, f"component_{os.path.splitext(component_name)[0]}_raw", output_dir)

        # Extract module configurations from component configuration
        modules = []

        # Handling modules list in component configuration
        if 'modules' in component_config:
            # Each module configuration is a dictionary containing a name field.
            for module_item in component_config['modules']:
                module_name = module_item['name']

                if module_name in config['modules']:
                    # Get top-level module configuration
                    full_module_config = config['modules'][module_name].copy()
                    full_module_config['name'] = module_name

                    # Preprocessing module name
                    full_module_config['singular'] = inflection.singularize(module_name)
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

        # Save the processed module configuration
        save_debug_data({
            'component_name': component_name,
            'processed_modules': modules,
            'modules_count': len(modules)
        }, f"component_{os.path.splitext(component_name)[0]}_processed", output_dir)

        # Preparing the context
        context = {
            'component_name': os.path.splitext(component_name)[0],
            'modules': modules,
            'has_multiple_modules': len(modules) > 1,
            'now': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        # Save template context
        save_debug_data(context, f"component_{os.path.splitext(component_name)[0]}_context", output_dir)

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