from io import BytesIO
from PIL import Image
from rembg import remove


def remove_background(image_bytes: bytes) -> Image.Image:
    """
    Deterministic background removal using U²-Net (rembg).
    - Preserves edges
    - No alpha matting (safer for products)
    - Returns RGBA PIL Image
    """
    try:
        output_bytes = remove(
            image_bytes,
            alpha_matting=False,
            only_mask=False,
            post_process_mask=False
        )

        return Image.open(BytesIO(output_bytes)).convert("RGBA")

    except Exception:
        return Image.open(BytesIO(image_bytes)).convert("RGBA")
