import json

def find_objects(text):
    """A generator that yields individual JSON objects from a string."""
    brace_level = 0
    start_index = -1

    for i, char in enumerate(text):
        if char == '{':
            if brace_level == 0:
                start_index = i
            brace_level += 1
        elif char == '}':
            brace_level -= 1
            if brace_level == 0 and start_index != -1:
                yield text[start_index : i + 1]
                start_index = -1

def fix_and_normalize_json(input_path, output_path):
    print(f"--- Processing {input_path} ---")

    raw_text = ''
    with open(input_path, 'r', encoding='utf-8-sig') as f:
        raw_text = f.read()

    merged_data = {}
    object_strings = list(find_objects(raw_text))

    if not object_strings:
        print(f"Error: No valid JSON objects found in {input_path}.")
        return

    print(f"Found {len(object_strings)} top-level JSON objects to merge.")

    for i, obj_str in enumerate(object_strings):
        try:
            obj = json.loads(obj_str)
            merged_data.update(obj)
        except json.JSONDecodeError as e:
            print(f"Error parsing object #{i+1} from {input_path}: {e}")
            print("Object content:", obj_str[:200] + "...") # Print snippet of problematic object
            return

    # Now, normalize the merged data from dot-notation to nested objects.
    nested_dict = {}

    def set_nested_value(d, keys, value):
        for k in keys[:-1]:
            if k not in d or not isinstance(d[k], dict):
                d[k] = {}
            d = d[k]
        d[keys[-1]] = value

    for key, value in merged_data.items():
        if isinstance(value, dict): # Handles already nested parts
            if key not in nested_dict:
                nested_dict[key] = {}
            # This is a simplified merge. A proper deep merge would be recursive.
            # For this specific file structure, this should be sufficient.
            for sub_key, sub_value in value.items():
                 nested_dict[key][sub_key] = sub_value
        else:
            keys = key.split('.')
            set_nested_value(nested_dict, keys, value)

    try:
        # Write the completely nested dictionary to the new file
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(nested_dict, f, indent=2, ensure_ascii=False)
        print(f"Successfully merged, normalized, and saved to {output_path}")

        # Final validation step
        with open(output_path, 'r', encoding='utf-8') as f:
            json.load(f)
        print(f"Validation successful for {output_path}.\n")

    except Exception as e:
        print(f"An error occurred during file writing or validation: {e}\n")

if __name__ == "__main__":
    fix_and_normalize_json('public/locales/en.json', 'public/locales/en.fixed.json')
    fix_and_normalize_json('public/locales/id.json', 'public/locales/id.fixed.json')
