import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_bg_prompt(raw_caption: str) -> str | None:
    """
    Convert a factual vision caption into a SAFE background styling prompt.
    Returns None if the output is unsafe.
    """

    prompt = f"""
You generate background styling instructions for product image editors.

STRICT RULES:
- Do NOT describe objects other than the product.
- Do NOT mention people, rooms, furniture, food, or lifestyle scenes.
- Do NOT invent props.
- Describe ONLY background tone, lighting, and style.
- Prefer studio / ecommerce / catalog backgrounds.
- Keep it under 40 words.

Vision caption:
"{raw_caption}"

Return ONE short paragraph. No quotes.
"""

    try:
        res = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )
        text = res.choices[0].message.content.strip()
    except Exception:
        return None

    banned = [
        "room", "table", "kitchen", "person", "people", "food",
        "tea", "coffee", "bed", "chair", "scene", "lifestyle"
    ]

    lowered = text.lower()
    if any(word in lowered for word in banned):
        return None

    return text
