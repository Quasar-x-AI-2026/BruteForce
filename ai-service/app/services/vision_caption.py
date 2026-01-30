from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import io
import torch

processor = BlipProcessor.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)
model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)
model.eval()


def image_to_text(image_bytes: bytes) -> str:
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    inputs = processor(image, return_tensors="pt")

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_length=40,
            num_beams=3
        )

    caption = processor.decode(output[0], skip_special_tokens=True)
    return caption
