# Build stage for React frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend

# Copy frontend files
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Python stage for FastAPI backend
FROM python:3.11-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy FastAPI backend
COPY fetch.py .
COPY .env .

# Copy built frontend from previous stage
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Expose port
EXPOSE 8000

# Run FastAPI with uvicorn
CMD ["uvicorn", "fetch:app", "--host", "0.0.0.0", "--port", "8000"] 