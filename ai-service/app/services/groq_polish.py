import os
import requests

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "llama-3.1-8b-instant"

def polish_caption(raw_caption: str) -> dict:
    """
    Convert raw vision caption into a neutral, factual
    catalog-style title and description.
    """
    prompt = f"""
You are writing a neutral catalog description for a handmade object.
You are NOT a marketer or copywriter.

This task is descriptive documentation, not promotion.

STRICT RULES:
- Do NOT use marketing or sales language.
- Do NOT address the buyer.
- Do NOT use phrases like:
  "make a statement", "elevate", "perfect for", "ideal for",
  "adds a touch of", "beautiful", "stunning",
  "rustic charm", "premium", "luxury".
- Do NOT persuade, hype, or recommend.
- Describe ONLY what can be reasonably inferred from the image.
- Do NOT guess usage unless it is visually obvious.
- Focus on material, form, shape, and surface texture.
- Tone must be calm, factual, and restrained.
- Avoid emotional or romantic language.

Raw visual description (literal):
"{raw_caption}"

OUTPUT FORMAT (STRICT JSON ONLY):
{{
  "title": "2–4 word neutral name using material + object type",
  "description": [
    "Sentence describing material, form, and surface details.",
    "Sentence describing visible structure or arrangement without recommendation."
  ]
}}
"""


    res = requests.post(
        GROQ_URL,
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.4,
        },
        timeout=30,
    )

    res.raise_for_status()
    return res.json()["choices"][0]["message"]["content"]
