# BruteForce

Krafti – AI-Powered Craft Listing Generator (MVP)
Overview

Krafti is a web application that transforms a single product photo uploaded by an artisan into a ready-to-use product listing.
It focuses on handcrafted goods and emphasizes visual quality, material awareness, and artisan storytelling.

From one image, Krafti:

Removes the background

Enhances the product image

Generates a product title and description using vision + language models

(Prepared) Estimates a suggested price via an independent pricing layer

This MVP demonstrates a complete image → intelligence → listing pipeline.

High-Level Architecture
Frontend (React + TypeScript)
        |
        |  multipart/form-data (image)
        v
AI Service (FastAPI, Python)
        |
        |-- Image Enhancement Pipeline
        |-- Vision → Text Pipeline
        |-- Language Polishing (LLM)
        |
        v
JSON Response
(title, description, enhanced image, price placeholder)

Tech Stack
Frontend

React

TypeScript

Vite

TailwindCSS

Fetch API

Backend (AI Service)

FastAPI

Uvicorn

Python 3.x

AI / ML

Background removal: rembg (U²-Net)

Image enhancement: Pillow (brightness, contrast, sharpness)

Vision → text: BLIP (Salesforce/blip-image-captioning-base)

Text refinement: Groq LLM (polishing only, not vision)

Future pricing intelligence: isolated, rule + model driven

Supporting Libraries

transformers

torch

huggingface-hub

python-multipart

numpy

onnxruntime

python-dotenv

AI Pipeline (Step-by-Step)
1. Image Upload

The user uploads a single product image from the frontend.

2. Background Removal

Powered by rembg

Uses U²-Net

Produces an RGBA image with transparent background

Fail-safe: returns original image if removal fails

3. Image Enhancement

Deterministic, non-destructive enhancements

Slight brightness lift

Contrast boost

Mild sharpening

No artistic filters (important for crafts authenticity)

4. Vision → Text (Captioning)

BLIP model generates a raw visual caption

Example:

"a ceramic mug with a curved handle and matte surface"


This caption is factual and visual, not marketing-oriented.

5. Language Polishing (Groq LLM)

The raw caption is passed to a Groq-hosted LLM

The LLM is instructed to:

Avoid generic phrases

Infer material, texture, and form conservatively

Produce artisan-style language

Generate:

A 3–6 word title

2 short descriptive sentences

If the LLM fails or is unavailable, the system falls back safely to the raw vision caption.

6. Response to Frontend

The API returns:

{
  "image": "<base64>",
  "title": "Earthen Terra Vessel",
  "description": [
    "A sturdy clay vessel with organic curves and subtle surface texture.",
    "Natural tones evoke a grounded, rustic character."
  ],
  "price": null
}

Folder Structure (AI Service)
ai-service/
│
├── app/
│   ├── main.py                # FastAPI entry point
│   │
│   ├── api/
│   │   └── enhance.py         # /enhance endpoint
│   │
│   ├── services/
│   │   ├── background.py      # Background removal (rembg)
│   │   ├── enhancement.py     # Image enhancement
│   │   ├── description.py     # Vision caption generation (BLIP)
│   │   ├── groq_llm.py        # Text polishing (Groq)
│   │   └── vision_stub.py     # Testing / fallback
│   │
│   ├── utils/
│   │   ├── image.py           # PIL → base64 utilities
│   │   └── validators.py
│   │
│   └── test_pipeline.py       # End-to-end testing
│
├── venv/
└── requirements.txt


Important design rule followed:
Each service is independent. No circular dependencies. Pricing can be added without touching vision or enhancement.

Frontend Flow

User uploads image

Progress indicator runs

/enhance endpoint is called

Result page displays:

Enhanced image

Generated title

Generated description

Placeholder price

User can upload another product

No job queues. No polling. Direct synchronous MVP flow.

Current MVP Status (Honest Evaluation)
What Is Working Well

End-to-end pipeline is complete

Vision + language integration is real, not mocked

Image quality improvement is visible

Outputs are no longer hardcoded

Architecture is modular and extensible

What Is Still Weak

Vision captions can still be generic for simple objects

Pricing intelligence not yet implemented

No user feedback loop or edits

No caching or persistence

Overall Verdict

This is a solid MVP, not a demo toy.

For a hackathon or early-stage product:

This is credible

The AI work is real

The scope is appropriate

The system is extensible

It is not yet “winning” on polish or depth — but it wins on architecture and execution.

Next Logical Extensions (Non-Breaking)

Independent price intelligence module

Multi-image support

Material classification head

Seller tone customization

Editable AI suggestions

Running the AI Service
# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000