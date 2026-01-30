from PIL import Image, ImageEnhance, ImageFilter

def enhance_image(image: Image.Image) -> Image.Image:
    """
    Deterministic, marketplace-grade enhancement:
    - Controlled exposure lift
    - Better local contrast
    - Natural color depth
    - Clean edge clarity (no halos)
    """

    image = ImageEnhance.Brightness(image).enhance(1.05)

    image = ImageEnhance.Contrast(image).enhance(1.18)

    image = ImageEnhance.Color(image).enhance(1.12)

    image = image.filter(
        ImageFilter.UnsharpMask(
            radius=1.4,
            percent=140,
            threshold=3
        )
    )

    image = ImageEnhance.Sharpness(image).enhance(1.1)

    return image
