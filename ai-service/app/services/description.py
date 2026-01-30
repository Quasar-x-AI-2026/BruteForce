import json
from PIL import Image
from app.services.vision_blip import generate_raw_caption
from app.services.groq_polish import polish_caption

def generate_product_text(image: Image.Image) -> dict:
    """
    Full pipeline:
    Image → BLIP → Groq polish → structured text
    """
    raw_caption = generate_raw_caption(image)

    polished = polish_caption(raw_caption)

    try:
        parsed = json.loads(polished)
        return {
            "title": parsed.get("title", raw_caption.title()),
            "description": parsed.get("description", [raw_caption]),
            "caption": raw_caption, 
        }
    except Exception:
        return {
            "title": raw_caption.title(),
            "description": [raw_caption],
            "caption": raw_caption,  
        }
