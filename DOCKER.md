# Docker Setup for Modern Blog

This document provides comprehensive instructions for running the Modern Blog application using Docker.

## 🐳 Docker Files Overview

- **`Dockerfile`** - Production-ready multi-stage build
- **`Dockerfile.dev`** - Development environment with hot reloading
- **`docker-compose.yml`** - Orchestration for both production and development
- **`.dockerignore`** - Excludes unnecessary files from build context

## 🚀 Quick Start

### Production Build

```bash
# Build and run production container
docker-compose up app

# Or build manually
docker build -t modern-blog .
docker run -p 3000:3000 modern-blog
```

### Development Environment

```bash
# Run development container with hot reloading
docker-compose --profile dev up app-dev

# Or build manually
docker build -f Dockerfile.dev -t modern-blog-dev .
docker run -p 3001:3000 -v $(pwd):/app modern-blog-dev
```

## 🏗️ Build Process

### Production Dockerfile Stages

1. **Base Stage** - Uses Node.js 18 Alpine for minimal size
2. **Dependencies Stage** - Installs pnpm and dependencies
3. **Builder Stage** - Builds the Next.js application
4. **Runner Stage** - Creates optimized production image

### Development Dockerfile

- Single-stage build for faster iteration
- Volume mounting for hot reloading
- Development server with `pnpm dev`

## ⚙️ Configuration

### Environment Variables

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

### Ports

- **Production**: `3000:3000`
- **Development**: `3001:3000`

## 🔧 Docker Commands

### Build Images

```bash
# Production
docker build -t modern-blog .

# Development
docker build -f Dockerfile.dev -t modern-blog-dev .
```

### Run Containers

```bash
# Production
docker run -d -p 3000:3000 --name modern-blog-prod modern-blog

# Development
docker run -d -p 3001:3000 -v $(pwd):/app --name modern-blog-dev modern-blog-dev
```

### Container Management

```bash
# View running containers
docker ps

# View logs
docker logs modern-blog-prod

# Stop containers
docker stop modern-blog-prod modern-blog-dev

# Remove containers
docker rm modern-blog-prod modern-blog-dev

# Remove images
docker rmi modern-blog modern-blog-dev
```

## 🐳 Docker Compose

### Production Stack

```bash
# Start production service
docker-compose up app

# Start in background
docker-compose up -d app

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Development Stack

```bash
# Start development service
docker-compose --profile dev up app-dev

# Start in background
docker-compose --profile dev up -d app-dev

# View logs
docker-compose logs -f app-dev
```

## 🏥 Health Checks

The application includes a health check endpoint at `/api/health` that returns:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

Docker health checks are configured to monitor this endpoint every 30 seconds.

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using port 3000
   lsof -i :3000
   
   # Use different port
   docker run -p 3001:3000 modern-blog
   ```

2. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Build Failures**
   ```bash
   # Clean build
   docker system prune -a
   docker build --no-cache -t modern-blog .
   ```

4. **Container Won't Start**
   ```bash
   # Check logs
   docker logs <container-name>
   
   # Check container status
   docker inspect <container-name>
   ```

### Debug Mode

```bash
# Run container with interactive shell
docker run -it --rm modern-blog /bin/sh

# Execute commands in running container
docker exec -it <container-name> /bin/sh
```

## 📊 Performance Optimization

### Multi-stage Build Benefits

- **Smaller final image** - Only runtime dependencies included
- **Faster builds** - Dependencies cached in separate layers
- **Security** - Production image doesn't contain build tools

### Alpine Linux Benefits

- **Minimal size** - Base image ~5MB vs ~300MB for Ubuntu
- **Security** - Smaller attack surface
- **Fast startup** - Optimized for containers

## 🚢 Deployment

### Production Deployment

```bash
# Build production image
docker build -t modern-blog:latest .

# Tag for registry
docker tag modern-blog:latest your-registry/modern-blog:latest

# Push to registry
docker push your-registry/modern-blog:latest
```

### Environment-specific Builds

```bash
# Build for staging
docker build --build-arg NODE_ENV=staging -t modern-blog:staging .

# Build for production
docker build --build-arg NODE_ENV=production -t modern-blog:production .
```

## 📝 Best Practices

1. **Use specific base image versions** - Avoid `latest` tags
2. **Multi-stage builds** - Separate build and runtime dependencies
3. **Health checks** - Monitor application health
4. **Security** - Run as non-root user
5. **Optimization** - Use `.dockerignore` to exclude unnecessary files
6. **Documentation** - Keep Docker setup documented and updated

## 🔗 Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Alpine Linux](https://alpinelinux.org/)

## 📞 Support

For Docker-related issues:

1. Check the troubleshooting section above
2. Review Docker logs: `docker logs <container-name>`
3. Verify configuration files
4. Check system resources and permissions

---

*Happy Containerizing! 🐳*
