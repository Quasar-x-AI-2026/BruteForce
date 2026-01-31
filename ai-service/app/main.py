from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

print("MAIN.PY: starting import")

try:
    from app.api.enhance import router as enhance_router
    print("MAIN.PY: enhance router imported successfully")
except Exception as e:
    print("MAIN.PY: FAILED to import enhance router")
    print(e)
    raise

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://bruteforce-vl61.onrender.com/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(enhance_router)

@app.get("/health")
def health():
    return {"status": "ok"}
