# Marathi Voice Writer - Backend

FastAPI backend for the Marathi Voice Writer PWA.

## Requirements

- Python 3.9+
- MongoDB

## Setup Instructions

1. Create a Python virtual environment:
```bash
cd backend
python -m venv venv
```

2. Activate the virtual environment:
- On Windows:
```bash
venv\Scripts\activate
```
- On Linux/Mac:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
Copy `.env.example` to `.env` and adjust the variables to match your MongoDB setup and environment.
```bash
cp .env.example .env
```

5. Start the FastAPI development server:
```bash
uvicorn app.main:app --reload --port 8000
```

6. Test the API:
Open your browser and navigate to: http://localhost:8000/api/v1/health

You should receive:
```json
{
  "status": "ok",
  "service": "marathi-voice-writer-api"
}
```

Interactive API documentation (Swagger UI) is available at: http://localhost:8000/docs
