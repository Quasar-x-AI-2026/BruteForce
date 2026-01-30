import os
import base64
import requests
from dotenv import load_dotenv
from io import BytesIO
from PIL import Image

from app.services.bg_prompt_llm import generate_bg_prompt

load_dotenv()
PIXELCUT_API_KEY = os.getenv("PIXELCUT_API_KEY")
PIXELCUT_URL = "https://api.developer.pixelcut.ai/v1/generate-background"





def _response_to_image(data) -> Image.Image:
    return Image.open(BytesIO(data)).convert("RGB")


def try_pixelcut_background(
    product_img: Image.Image,
    raw_caption: str
) -> Image.Image | None:
    """
    Attempts Pixelcut background generation.
    Returns PIL Image on success, None on ANY failure.
    """

   
    bg_prompt = "product photography, sitting on a dark oak table, dark grey concrete wall background, heavy contact shadow under product, studio spotlight on center, vignette edges, realistic ground reflection, ambient occlusion, global illumination, 8k resolution, cinematic lighting"

   

    white_bg = product_img.convert("RGB")

    img_byte_arr = BytesIO()
    white_bg.save(img_byte_arr,format="JPEG")
    img_byte_arr.seek(0)

    files = {
        "image": ("upload.jpg",img_byte_arr,"image/jpeg"),
    }

    headers = {
        "X-API-KEY": PIXELCUT_API_KEY,
        "Accept": "image/jpeg"
    }

    data = {
        "prompt" : bg_prompt
    }

    try:
        res = requests.post(
            PIXELCUT_URL,
            files=files,
            headers=headers,
            data=data,
            timeout= 30
        )
        if res.status_code != 200:
            print(f"Pixelcut error:{res.status_code} : {res.text}")
            return None
        data = res.content
    except Exception:
        return None

  

    try:
        return _response_to_image(data)
    except Exception:
        return None
