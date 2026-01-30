from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import torch

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)

def generate_raw_caption(image: Image.Image) -> str:
    """
    Generate a raw factual caption from an image using BLIP.
    No creativity. Pure visual description.
    """
    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        out = model.generate(**inputs, max_new_tokens=30)

    caption = processor.decode(out[0], skip_special_tokens=True)
    return caption.strip()
