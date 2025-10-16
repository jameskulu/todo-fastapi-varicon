# Use the official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirement file first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run Alembic migrations automatically at container startup
CMD alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000
