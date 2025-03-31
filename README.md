# Docker-2498
# Express.js Web Server with Docker

This project is a simple **Express.js web server** that serves static files from the `public/` directory. The server is containerized using **Docker** for easy deployment.

## Features
- Serves static files (HTML, CSS, JS) from the `public/` folder.
- Uses **Express.js** as the backend framework.
- Dockerized for portability and deployment.

---
---

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

---

## Installation & Usage

### **1. Run Locally (Without Docker)**
```sh
# Install dependencies
npm install

# Start the server
node server.js
```
Server will be running at: [http://localhost:3000](http://localhost:3000)

### **2. Run with Docker**

#### **Step 1: Build the Docker Image**
```sh
docker build -t express-docker-app .
```

#### **Step 2: Run the Container**
```sh
docker run -p 3000:3000 express-docker-app
```

Server will be accessible at: [http://localhost:3000](http://localhost:3000)

---

## Dockerfile Breakdown
```dockerfile
# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy all files
COPY . .

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
```

---



