# Marathi Voice Writer

A complete application featuring a Next.js frontend (PWA) and a Python FastAPI backend.

## Project Structure

This is a monorepo setup containing both frontend and backend:

```
project-root/
├── frontend/    ← Next.js PWA (User Interface)
└── backend/     ← Python FastAPI (API Services)
```

### Frontend

The frontend is built using Next.js (App Router), React, Tailwind CSS, and Lucide Icons. It is designed mobile-first as a PWA, targeting lawyers requiring Marathi voice dictation.

To run the frontend:
```bash
cd frontend
npm install
npm run dev
```

### Backend

The backend is built with Python and FastAPI (currently foundation only). It will later handle audio upload, transcription (Speech-to-Text), document storage, and user auth.

To run the backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (or source venv/bin/activate on Mac/Linux)
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## Upcoming Features (Roadmap)
- MongoDB Integration for user and document storage
- Marathi Speech-to-Text Integration
- Next.js ↔ FastAPI integration
- Authentication
- PDF Export and Sharing
