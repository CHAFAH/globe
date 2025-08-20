# Globe Explorer: Interactive World Visualization Platform

![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.18.0-000000?logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

Globe Explorer is an interactive web application that provides dynamic visualizations of global data with customizable themes, real-time calendar integration, and country information displays. This containerized solution demonstrates modern web development practices with Docker, environment-based configuration, and responsive design.

<img width="1632" height="799" alt="image" src="https://github.com/user-attachments/assets/81eae0dd-4341-43b5-8f2a-ec1124824fa7" />


## Features

###  Dynamic Visualizations
- **Customizable Themes**: Dynamic background colors and styling through environment variables
- **Rotating Earth Background**: Animated globe visualization for enhanced user experience
- **Responsive Design**: Adapts seamlessly to desktop, tablet, and mobile devices
- **Real-time Calendar**: Current month display with configurable enable/disable option

###  Global Information
- **Country Data Display**: Showcase country information with customizable content
- **Interactive Elements**: User-friendly interface with smooth transitions and animations
- **Configuration Flexibility**: Environment-based customization for different deployment scenarios

### Production-Ready Architecture
- **Docker Containerization**: Optimized multi-stage Docker builds
- **Environment Configuration**: Flexible app configuration through environment variables
- **Health Monitoring**: Built-in health checks and status endpoints
- **Security Hardened**: Non-root container execution and security best practices

##  Technical Stack

- **Backend Framework**: Node.js with Express.js
- **Frontend**: HTML5, CSS3 with modern responsive design
- **Containerization**: Docker with optimized production image
- **Configuration**: Environment variable-based customization
- **Deployment**: Ready for Kubernetes, Docker Swarm, or cloud platforms

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/CHAFAH/globe.git
cd globe

# Build the Docker image
docker build -t globe-explorer:latest .

# Run with custom configuration
docker run -d \
  -e COLOR=green \
  -e CALENDAR=true \
  -e COUNTRY="Cameroon" \
  -p 8080:8080 \
  --name globe-app \
  globe-explorer:latest

# Access the application
open http://localhost:8080
```

### Environment Variables

Configure the application using these environment variables:

| Variable | Description | Default Value | Example |
|----------|-------------|---------------|---------|
| `COLOR` | Background color theme | `blue` | `green`, `red`, `purple` |
| `CALENDAR` | Enable/disable calendar display | `false` | `true`, `false` |
| `COUNTRY` | Country name to display | (none) | `Cameroon`, `USA`, `France` |
| `PORT` | Application port | `8080` | `3000`, `8080`, `9000` |
| `NODE_ENV` | Environment mode | `development` | `production`, `development` |

### Docker Compose Deployment

```yaml
# docker-compose.yml
version: '3.8'
services:
  globe-explorer:
    image: globe-explorer:latest
    ports:
      - "8080:8080"
    environment:
      - COLOR=blue
      - CALENDAR=true
      - COUNTRY=Cameroon
      - NODE_ENV=production
    restart: unless-stopped
```

```bash
# Deploy with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## Production Deployment

### Kubernetes Deployment

```yaml
# globe-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: globe-explorer
spec:
  replicas: 3
  selector:
    matchLabels:
      app: globe-explorer
  template:
    metadata:
      labels:
        app: globe-explorer
    spec:
      containers:
      - name: globe-app
        image: globe-explorer:latest
        ports:
        - containerPort: 8080
        env:
        - name: COLOR
          value: "blue"
        - name: CALENDAR
          value: "true"
        - name: COUNTRY
          value: "Cameroon"
        - name: NODE_ENV
          value: "production"
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: globe-service
spec:
  selector:
    app: globe-explorer
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
```

```bash
# Apply Kubernetes configuration
kubectl apply -f globe-deployment.yaml

# Check deployment status
kubectl get pods,svc
```

### Cloud Deployment (AWS ECS)

```bash
# Create ECR repository
aws ecr create-repository --repository-name globe-explorer

# Build and push image
docker build -t globe-explorer .
docker tag globe-explorer:latest 123456789012.dkr.ecr.region.amazonaws.com/globe-explorer:latest
docker push 123456789012.dkr.ecr.region.amazonaws.com/globe-explorer:latest

# Deploy to ECS
aws ecs create-service --cluster my-cluster --service-name globe-service --task-definition globe-task
```

##  Configuration Options

### Custom Themes

The application supports multiple color themes:

```bash
# Available color options
docker run -e COLOR=blue globe-explorer
docker run -e COLOR=green globe-explorer
docker run -e COLOR=red globe-explorer
docker run -e COLOR=purple globe-explorer
docker run -e COLOR=orange globe-explorer
```

### Advanced Configuration

```bash
# Custom port and full configuration
docker run -d \
  -e PORT=3000 \
  -e COLOR=green \
  -e CALENDAR=true \
  -e COUNTRY="United States" \
  -e NODE_ENV=production \
  -p 3000:3000 \
  globe-explorer:latest
```

## 🔒 Security Features

- **Non-root Execution**: Container runs as non-privileged user
- **Minimal Base Image**: Alpine Linux for reduced attack surface
- **Environment Separation**: Different configurations for dev/prod
- **Port Configuration**: Flexible port binding for security
- **Resource Limits**: Configurable memory and CPU limits

## 🤝 Contributing

We welcome contributions to enhance Globe Explorer:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Hilltop Consultancy** - [support@htconsult.dk](mailto:support@htconsult.dk)  
**Website**: [https://www.htconsult.dk](https://www.htconsult.dk)

**Sani Chafah** - [prsan@nebulancesystems.com](mailto:prsan@nebulancesystems.com)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sani-chafah/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?logo=github&logoColor=white)](https://github.com/CHAFAH)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-green?logo=react&logoColor=white)](https://sani-chafah.com)

**Project Link:** [https://github.com/CHAFAH/globe-explorer](https://github.com/CHAFAH/globe-explorer)

---

**⭐ Star this repo if you found it useful!**

---

*Globe Explorer demonstrates modern containerized application development with flexible configuration and production-ready deployment patterns.*
