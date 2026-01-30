from io import BytesIO
from PIL import Image


MIN_WIDTH = 400
MIN_HEIGHT = 400


def validate_image(image_bytes: bytes) -> Image.Image:
    """
    Validates input image bytes.
    Raises ValueError on invalid input.
    """
    try:
        img = Image.open(BytesIO(image_bytes))
        img.verify()

        img = Image.open(BytesIO(image_bytes))
        w, h = img.size

        if w < MIN_WIDTH or h < MIN_HEIGHT:
            raise ValueError("image resolution too low")

        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGB")

        return img

    except Exception as e:
        raise ValueError(f"invalid image input: {e}")
