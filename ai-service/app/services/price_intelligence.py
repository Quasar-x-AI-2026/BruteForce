from typing import Dict, List, Optional



OBJECT_HINTS = {
    # Functional
    "mug": "functional_small",
    "cup": "functional_small",
    "bowl": "functional_small",
    "plate": "functional_large",
    "dish": "functional_large",

    # Storage
    "basket": "storage",
    "box": "storage",
    "container": "storage",

    # Vessels
    "vase": "vessel",
    "pot": "vessel",
    "jar": "vessel",

    # collectible
    "doll": "figurative",
    "figurine": "figurative",
    "idol": "figurative",
    "statue": "figurative",
    "toy": "figurative",

    # Decor
    "decor": "decor_simple",
    "showpiece": "decor_simple",
    "ornament": "decor_simple",

    # Art-heavy
    "carved": "decor_fine",
    "sculpted": "decor_fine",
    "engraved": "decor_fine",
}

MATERIAL_HINTS = {
    "wood": "wood",
    "wooden": "wood",
    "clay": "ceramic",
    "ceramic": "ceramic",
    "terracotta": "ceramic",
    "porcelain": "ceramic",
    "bamboo": "bamboo",
    "rattan": "bamboo",
    "metal": "metal",
    "brass": "metal",
    "iron": "metal",
    "glass": "glass",
    "textile": "textile",
    "fabric": "textile",
    "cotton": "textile",
    "wool": "textile",
}

CRAFT_HINTS = [
    "handcrafted",
    "handmade",
    "hand-carved",
    "intricate",
    "detailed",
    "artisan",
    "traditional",
]

SIZE_HINTS = {
    "small": 0.85,
    "mini": 0.8,
    "large": 1.25,
    "tall": 1.25,
    "set": 1.4,
}


ECONOMIC_BASE = {
    # Functional items (daily use)
    "functional_small": (800, 1200),    
    "functional_large": (1000, 1500),   

    # storage
    "storage": (1000, 1600),          
    # Vessels
    "vessel": (1200, 2000),             

    # Decorative items
    "decor_simple": (1300, 2200),       
    "decor_fine": (2000, 3200),        

    # Figurative / collectible
    "figurative": (2200, 3600),          

    # Textile
    "textile_small": (1200, 2000),       
    "textile_large": (2500, 4200),       

    # Art-heavy 
    "wood_art": (2600, 4200),
    "metal_art": (3000, 5200),
    "glass_art": (2800, 4800),

    "unknown_handmade": (1200, 2000),
}




def estimate_price(
    *,
    title: str,
    description: List[str],
    visual_caption: str,
) -> Dict:

    text = _merge(title, description, visual_caption)

    obj_class = _infer_object_class(text)
    material = _infer_material(text)

    base_min, base_max = ECONOMIC_BASE[obj_class]

    craft_hits = sum(1 for k in CRAFT_HINTS if k in text)
    if craft_hits:
        base_min *= 1 + 0.15 * craft_hits
        base_max *= 1 + 0.25 * craft_hits

    size_mul = _infer_size(text)
    base_min *= size_mul
    base_max *= size_mul

    if obj_class in {"decor_simple", "decor_fine", "figurative"}:
        if material == "wood":
            base_min *= 1.1
            base_max *= 1.15
        if material == "metal":
            base_min *= 1.2
            base_max *= 1.3

    min_p, max_p = _round(base_min), _round(base_max)

    return {
        "min": min_p,
        "max": max_p,
        "currency": "INR",
        "confidence": _confidence(obj_class, material, craft_hits),
        "rationale": _rationale(obj_class, material),
    }



def _merge(title, desc, cap) -> str:
    return " ".join([title, " ".join(desc), cap]).lower()


def _infer_object_class(text: str) -> str:
    for k, v in OBJECT_HINTS.items():
        if k in text:
            return v
    return "unknown_handmade"


def _infer_material(text: str) -> Optional[str]:
    for k, v in MATERIAL_HINTS.items():
        if k in text:
            return v
    return None


def _infer_size(text: str) -> float:
    for k, v in SIZE_HINTS.items():
        if k in text:
            return v
    return 1.0


def _round(v: float) -> int:
    if v < 2000:
        return round(v / 100) * 100
    return round(v / 250) * 250


def _confidence(obj_class, material, craft_hits) -> float:
    score = 0.35
    if obj_class != "unknown_handmade":
        score += 0.25
    if material:
        score += 0.15
    if craft_hits:
        score += 0.15
    return round(min(score, 0.9), 2)


def _rationale(obj_class, material) -> str:
    r = "Handmade item"
    if material:
        r += f" crafted from {material}"
    r += f", categorized as {obj_class.replace('_', ' ')}."
    return r
