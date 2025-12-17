# Docker Integration for Physical AI & Humanoid Robotics Textbook

## Overview
This document describes the Docker integration for the Physical AI & Humanoid Robotics textbook project. The purpose is to provide students and educators with consistent, reproducible environments for running robotics simulations and AI experiments.

## Docker Architecture

### Core Components
1. **Base Robotics Environment**: Contains common robotics libraries (ROS/ROS2, Gazebo, PyBullet)
2. **AI/ML Environment**: Pre-configured with TensorFlow, PyTorch, and other relevant frameworks
3. **Simulation Environment**: Contains various simulation tools for Physical AI experiments
4. **Textbook Examples**: Pre-installed with all code examples from the textbook

### Image Structure
```
physical-ai-textbook/
├── base-image/
│   ├── Dockerfile
│   └── requirements.txt
├── ai-env/
│   ├── Dockerfile
│   └── ai-requirements.txt
├── simulation-env/
│   ├── Dockerfile
│   └── sim-requirements.txt
└── textbook-examples/
    ├── Dockerfile
    └── textbook-requirements.txt
```

## Docker Files

### Base Image (Dockerfile.base)
```Dockerfile
FROM ubuntu:22.04

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    git \
    curl \
    vim \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create workspace
WORKDIR /workspace

# Copy and install Python requirements
COPY requirements.txt /workspace/requirements.txt
RUN pip3 install -r requirements.txt

# Set up environment
ENV PYTHONPATH="/workspace"
ENV TERM=xterm

# Default command
CMD ["/bin/bash"]
```

### AI/ML Environment (Dockerfile.ai)
```Dockerfile
FROM physicalai/base:latest

# Install AI/ML frameworks
RUN pip3 install \
    tensorflow==2.13.0 \
    torch==2.0.1 \
    torchvision==0.15.2 \
    torchaudio==2.0.2 \
    scikit-learn==1.3.0 \
    numpy==1.24.3 \
    pandas==2.0.3 \
    matplotlib==3.7.2 \
    jupyter==1.0.0

# Create AI examples directory
WORKDIR /workspace/ai_examples
```

### Simulation Environment (Dockerfile.sim)
```Dockerfile
FROM physicalai/base:latest

# Install simulation dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    libglib2.0-dev \
    libglu1-mesa-dev \
    libgl1-mesa-glx \
    libosmesa6-dev \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install PyBullet
RUN pip3 install pybullet==3.2.5

# Create simulation examples directory
WORKDIR /workspace/sim_examples
```

### Textbook Examples (Dockerfile.textbook)
```Dockerfile
FROM physicalai/ai:latest

# Copy textbook content
COPY . /workspace/textbook
WORKDIR /workspace/textbook

# Install textbook-specific requirements
RUN pip3 install -r requirements.txt

# Set up Jupyter for interactive learning
EXPOSE 8888
CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root"]
```

## Usage Instructions

### For Students
1. Install Docker on your system
2. Pull the textbook image: `docker pull physicalai/textbook:latest`
3. Run the environment: `docker run -it -p 8888:8888 physicalai/textbook:latest`

### For Educators
1. Build the images locally: `docker build -f Dockerfile.base -t physicalai/base .`
2. Build dependent images in order: ai, sim, textbook
3. Push to your preferred container registry

## Docker Compose Configuration

For multi-container scenarios, use the provided docker-compose.yml:

```yaml
version: '3.8'

services:
  textbook:
    image: physicalai/textbook:latest
    ports:
      - "8888:8888"
    volumes:
      - ./exercises:/workspace/exercises
      - ./projects:/workspace/projects
    environment:
      - DISPLAY=${DISPLAY}
    network_mode: host  # For GUI applications

  simulation:
    image: physicalai/simulation:latest
    volumes:
      - ./simulations:/workspace/simulations
    network_mode: host  # For robotics framework communication

  ai:
    image: physicalai/ai:latest
    volumes:
      - ./models:/workspace/models
      - ./datasets:/workspace/datasets
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

## Security Considerations

1. Use non-root users in containers where possible
2. Implement minimal image principles
3. Scan images for vulnerabilities
4. Do not store credentials in images