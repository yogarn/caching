This repository is part of BCC's internal workshop (or community service) focused on implementing server-side caching using Redis. Your task is to modify the service layer so that it no longer accesses the repository (database) directly. Instead, integrate Redis caching to optimize performance.

## Getting Started
### Prepare Evironment Variables
Copy the example environment file and modify it as needed.
```bash
cp .env.example .env
nano .env # or your favourite text editor
```
### Run the Application with Docker
Start the app using Docker. By default, it will run on port `3000` (or the port you specify in `.env`).
```bash
docker compose up --build -d
```
### Rebuild the App After Changes
If you make any modifications to the code, especially related to the cache logic, restart the app.
```bash
docker compose down
docker compose up --build -d
```
