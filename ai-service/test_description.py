from app.services.description import parse_gemini_output

raw = """
Title: Woven Bamboo Basket
Description:
- Circular basket made from bamboo
- Open top with natural finish
"""

result = parse_gemini_output(raw)
print(result)
