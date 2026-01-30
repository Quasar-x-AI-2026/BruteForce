from pathlib import Path

from services.background import remove_background
from services.enhancement import enhance_image
from utils.validators import validate_image


INPUT_IMAGE = "input.jpg"
OUTPUT_IMAGE = "output.png"


def main():
    image_bytes = Path(INPUT_IMAGE).read_bytes()

    validate_image(image_bytes)

    bg_removed = remove_background(image_bytes)
    enhanced = enhance_image(bg_removed)

    enhanced.save(OUTPUT_IMAGE, format="PNG")
    print("Pipeline OK → output.png generated")


if __name__ == "__main__":
    main()
