# Running ExecutorAI with Nginx Locally

## Quick Start

### 1. Ensure Docker is running
```bash
docker --version
docker ps
```

### 2. Ensure `.env.local` exists
```bash
cat .env.local
# should contain:
# OPENROUTER_API_KEY=sk-...
# OPENROUTER_REFERER=http://localhost
```

### 3. Start all services (app + nginx proxy + docker executor)
```bash
docker-compose up --build
```

### 4. Open in browser
```
http://localhost
```

That's it! Nginx is now proxying requests to your Next.js app on port 3000.

## What's happening

- **Nginx** (port 80): Reverse proxy that forwards requests to the app
- **App** (port 3000, internal): Your Next.js application
- **Docker Executor** (internal): Runs user code in isolated containers

## Services

```
http://localhost          → Nginx proxy (port 80)
  ├── / → app:3000 (Next.js UI)
  ├── /api/generate → app:3000 (code generation)
  ├── /api/execute → app:3000 (code execution)
  └── /health → app:3000 (healthcheck)
```

## Stopping

```bash
docker-compose down
```

## Logs

```bash
# All services
docker-compose logs -f

# Just app
docker-compose logs -f app

# Just nginx
docker-compose logs -f nginx
```

## Troubleshooting

**Port 80 already in use?**
Edit `docker-compose.yml` and change nginx ports to `"8080:80"`, then open `http://localhost:8080`

**Connection refused?**
Wait a few seconds for services to start, then refresh the page.

**App not responding?**
Check logs: `docker-compose logs app`

**Docker execution fails?**
Ensure `/var/run/docker.sock` exists on your host:
```bash
ls -l /var/run/docker.sock
```
