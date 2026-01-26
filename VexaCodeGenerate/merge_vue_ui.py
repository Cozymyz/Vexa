# Insert the content of the UI code file (.vueui) into the specified location of the corresponding Vue component file (.vue)
import re
from pathlib import Path
from typing import Tuple, Dict, List


class VueUIMerger:

    # UI_PLACEHOLDER for inserting UI code in Vue components
    UI_PLACEHOLDER = "<!-- Add component UI code here -->"

    # Supported UI file extensions
    UI_EXTENSIONS = ['.vueui', '.html', '.template']

    def __init__(self, vue_dir: str, ui_dir: str, ui_ext: str = '.vueui'):
        """
        Initialize the merger
            Args:
                vue_dir: Vue component file directory
                ui_dir: UI code file directory
                ui_ext: UI file extension
        """

        self.vue_dir = Path(vue_dir)
        self.ui_dir = Path(ui_dir)
        self.ui_ext = ui_ext if ui_ext.startswith('.') else f'.{ui_ext}'

        # Verify directory exists
        if not self.vue_dir.exists():
            raise FileNotFoundError(f'{self.vue_dir} does not exist')
        if not self.ui_dir.exists():
            raise FileNotFoundError(f'{self.ui_dir} does not exist')

    def find_matching_pairs(self) -> list[Tuple[Path, Path]]:
        """
        Find matching Vue component and UI code file pairs.
            Returns:
            A list of matching file pairs [(vue_file, ui_file), ...]
        """

        matching_pairs = []

        # Loop through all Vue component files
        vue_files = list(self.vue_dir.glob("**/*.vue"))

        for vue_file in vue_files:
            # Get filenames without extensions
            vue_stem = vue_file.stem

            # Find the matching UI file
            ui_file = self.ui_dir / f"{vue_stem}{self.ui_ext}"

            # If the file with the specified extension cannot be found, try a different extension
            if not ui_file.exists():
                for ext in self.UI_EXTENSIONS:
                    if ext != self.ui_ext:
                        ui_file = self.ui_dir / f"{vue_stem}{ext}"
                        if ui_file.exists():
                            break
                else:
                    # If none of these can be found, check if there are files with the same name but different capitalization.
                    ui_files = list(self.ui_dir.glob(f"{vue_stem}.*"))
                    ui_files = [f for f in ui_files if f.suffix.lower() in self.UI_EXTENSIONS]
                    if ui_files:
                        ui_file = ui_files[0]
                    else:
                        print(f"❌ No matching UI file for {vue_stem}")
                        continue
            if ui_file.exists():
                matching_pairs.append((vue_file, ui_file))

        return matching_pairs

    def merge_ui_into_vue(self, vue_file: Path, ui_file: Path) -> bool:
        """
        Merge UI code into Vue components
            Args:
                vue_dir: Vue component file directory
                ui_dir: UI code file directory

            Returns:
                True if the merge was successful, False otherwise
        """
        try:

            with open(vue_file, 'r', encoding='utf-8') as vue_f:
                vue_code = vue_f.read()
            with open(ui_file, 'r', encoding='utf-8') as ui_f:
                ui_code = ui_f.read()

            if self.UI_PLACEHOLDER not in vue_code:
                print(f"⚠️ Warning: No '{self.UI_PLACEHOLDER}' in {vue_f}")
                return False

            # Replace placeholders with UI code
            # Using regular expressions to ensure that only complete placeholders are replaced
            patten = re.escape(self.UI_PLACEHOLDER)
            new_vue_code = re.sub(patten, ui_code, vue_code, count=1)

            # Check if a replacement actually occurred
            if new_vue_code == vue_code:
                print(f"⚠️ Warning: The placeholder in {vue_f} was not successfully replaced")
                return False

            # Write back to Vue file
            with open(vue_file, 'w', encoding='utf-8') as vue_f:
                vue_f.write(new_vue_code)

            print(f"✅ Successfully merged {vue_file.name}")
            return True

        except Exception as e:
            print(f"Merging failed {vue_file}: {e}")
            return False

    def merge_all(self) -> Dict[str, List[str]]:
        """
        Merge all matched UI code into Vue components

            Returns:
                Dictionary containing lists of successes and failures
        """
        matching_pairs = self.find_matching_pairs()

        if not matching_pairs:
            print(f"❌ No matching Vue component and UI file pairs found")
            return {"success": [], "failed": []}

        for vue_file, ui_file in matching_pairs:
            print(f"  {vue_file.name} <-- {ui_file.name}")

        results = {
            "success": [],
            "failed": []
        }

        for vue_file, ui_file in matching_pairs:
            if self.merge_ui_into_vue(vue_file, ui_file):
                results["success"].append(str(vue_file))
            else:
                results["failed"].append(str(vue_file))

        return results

if __name__ == "__main__":

    VUE_DIR = "./output/components"
    UI_DIR = "./ui_dir"
    UI_EXT = ".vueui"

    try:
        merger = VueUIMerger(VUE_DIR, UI_DIR, UI_EXT)

        # Start merging
        results = merger.merge_all()

    except Exception as e:
        print(e)
        exit(1)