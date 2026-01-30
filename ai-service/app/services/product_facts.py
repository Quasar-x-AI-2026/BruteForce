# app/services/product_facts.py

import re


MATERIAL_KEYWORDS = {
    "clay": ["clay", "earthen", "terracotta", "mud"],
    "ceramic": ["ceramic", "porcelain", "stoneware"],
    "wood": ["wood", "wooden", "bamboo"],
    "metal": ["metal", "brass", "copper", "iron", "steel"],
    "fabric": ["cotton", "linen", "silk", "wool", "fabric", "woven"],
    "paper": ["paper", "papermache", "papier-mache"],
    "stone": ["stone", "marble", "granite"],
    "leather": ["leather", "hide"],
    "glass": ["glass"]
}


MEDIUM_KEYWORDS = {
    "pottery": ["pot", "pottery", "wheel-thrown", "ceramic", "clay"],
    "painting": ["painting", "painted", "hand-painted", "artwork"],
    "textile": ["woven", "embroidered", "stitched", "loom"],
    "metalwork": ["forged", "metal", "brass", "iron"],
    "woodcraft": ["carved", "wooden", "hand-carved"],
    "basketry": ["basket", "woven"],
    "sculpture": ["sculpture", "figurine", "statue"]
}


FORM_KEYWORDS = [
    "mug", "cup", "bowl", "plate", "vase", "pot",
    "lamp", "lantern",
    "mask", "idol", "figurine", "doll",
    "basket", "tray",
    "wall art", "painting", "panel"
]


SURFACE_KEYWORDS = {
    "matte": ["matte"],
    "glossy": ["glossy", "shiny"],
    "rough": ["rough", "textured"],
    "carved": ["carved"],
    "woven": ["woven"]
}


COLOR_REGEX = r"(white|black|brown|blue|green|beige|grey|red|yellow|orange)"


def extract_product_facts(caption: str) -> dict:
    text = caption.lower()

    materials = []
    for mat, keys in MATERIAL_KEYWORDS.items():
        if any(k in text for k in keys):
            materials.append(mat)

    medium = None
    for m, keys in MEDIUM_KEYWORDS.items():
        if any(k in text for k in keys):
            medium = m
            break

    form = next((f for f in FORM_KEYWORDS if f in text), None)

    surface = None
    for s, keys in SURFACE_KEYWORDS.items():
        if any(k in text for k in keys):
            surface = s
            break

    color_match = re.search(COLOR_REGEX, text)
    color = color_match.group(1) if color_match else None

    return {
        "materials": materials or None,
        "medium": medium,
        "form": form,
        "surface": surface,
        "color": color,
        "raw_caption": caption
    }
