from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.enhance import router as enhance_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://bruteforce-vl61.onrender.com/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(enhance_router)
