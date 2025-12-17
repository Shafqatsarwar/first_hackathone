---
id: 004
title: Course Details Implementation
stage: general
date: 2025-12-16
surface: agent
model: Qwen
feature: none
branch: main
user: user
command: manual update
labels: [course, physical-ai, robotics, curriculum, docker]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - README.md
 - .specify/memory/constitution.md
 - Dockerfile.base
 - Dockerfile.ai
 - Dockerfile.sim
 - Dockerfile.textbook
 - docker-compose.yml
 - requirements.txt
 - course-outline.md
 - modules/module1_ros/content.md
 - modules/module2_simulation/content.md
 - modules/module3_nvidia_isaac/content.md
 - modules/module4_vla/content.md
 - docker/README.md
tests:
 - none
---

## Prompt

The Course Details
Physical AI & Humanoid Robotics
Focus and Theme: AI Systems in the Physical World. Embodied Intelligence.
Goal: Bridging the gap between the digital brain and the physical body. Students apply their AI knowledge to control Humanoid Robots in simulated and real-world environments.
Quarter Overview
The future of AI extends beyond digital spaces into the physical world. This capstone quarter introduces Physical AI—AI systems that function in reality and comprehend physical laws. Students learn to design, simulate, and deploy humanoid robots capable of natural human interactions using ROS 2, Gazebo, and NVIDIA Isaac.
Module 1: The Robotic Nervous System (ROS 2)
Focus: Middleware for robot control.
ROS 2 Nodes, Topics, and Services.
Bridging Python Agents to ROS controllers using rclpy.
Understanding URDF (Unified Robot Description Format) for humanoids.


Module 2: The Digital Twin (Gazebo & Unity)
Focus: Physics simulation and environment building.
Simulating physics, gravity, and collisions in Gazebo.
High-fidelity rendering and human-robot interaction in Unity.
Simulating sensors: LiDAR, Depth Cameras, and IMUs.


Module 3: The AI-Robot Brain (NVIDIA Isaac™)
Focus: Advanced perception and training.
NVIDIA Isaac Sim: Photorealistic simulation and synthetic data generation.
Isaac ROS: Hardware-accelerated VSLAM (Visual SLAM) and navigation.
Nav2: Path planning for bipedal humanoid movement.


Module 4: Vision-Language-Action (VLA)
Focus: The convergence of LLMs and Robotics.
Voice-to-Action: Using OpenAI Whisper for voice commands.
Cognitive Planning: Using LLMs to translate natural language ("Clean the room") into a sequence of ROS 2 actions.
Capstone Project: The Autonomous Humanoid. A final project where a simulated robot receives a voice command, plans a path, navigates obstacles, identifies an object using computer vision, and manipulates it.

Why Physical AI Matters
Humanoid robots are poised to excel in our human-centered world because they share our physical form and can be trained with abundant data from interacting in human environments. This represents a significant transition from AI models confined to digital environments to embodied intelligence that operates in physical space.
Learning Outcomes
Understand Physical AI principles and embodied intelligence
Master ROS 2 (Robot Operating System) for robotic control
Simulate robots with Gazebo and Unity
Develop with NVIDIA Isaac AI robot platform
Design humanoid robots for natural interactions
Integrate GPT models for conversational robotics

## Response snapshot

I have updated the project files according to the Physical AI & Humanoid Robotics course details. Here are the key changes made:

1. **README.md**: Updated to reflect the complete course overview including modules, learning outcomes, and project structure.

2. **Constitution.md**: Updated to version 1.1.0 with principles specific to Physical AI & Humanoid Robotics, including Embodied Intelligence Focus and Humanoid Robotics Implementation Guidelines.

3. **Docker Configuration**: Updated all Dockerfiles to include ROS 2, Gazebo, NVIDIA Isaac, and VLA dependencies:
   - Dockerfile.base: Added ROS 2 dependencies
   - Dockerfile.ai: Added ROS 2, OpenAI Whisper, and LLM integration libraries
   - Dockerfile.sim: Added Gazebo and simulation dependencies
   - Dockerfile.textbook: Updated to include all Physical AI tools
   - docker-compose.yml: Updated services to reflect module-specific environments

4. **Requirements.txt**: Added ROS 2, NVIDIA Isaac, Whisper, and LangChain dependencies.

5. **Course Outline**: Created comprehensive course outline detailing all 4 modules with learning objectives, topics, and assignments.

6. **Module Content**: Created initial content for all 4 modules:
   - Module 1: The Robotic Nervous System (ROS 2)
   - Module 2: The Digital Twin (Gazebo & Unity)
   - Module 3: The AI-Robot Brain (NVIDIA Isaac™)
   - Module 4: Vision-Language-Action (VLA)

7. **Docker Directory**: Created with specific README for Docker configurations.

The project now fully aligns with the Physical AI & Humanoid Robotics curriculum, with proper focus on embodied intelligence, ROS 2, simulation, NVIDIA Isaac, and Vision-Language-Action integration.

## Outcome

- ✅ Impact: Project fully updated to reflect Physical AI & Humanoid Robotics course curriculum
- 🧪 Tests: none required
- 📁 Files: 14 files updated/created
- 🔁 Next prompts: Continue with specific module implementations
- 🧠 Reflection: Course structure now accurately reflects the Physical AI & Humanoid Robotics focus

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): not applicable
- Prompt variant (if applicable): not applicable
- Next experiment (smallest change to try): implement specific exercises for each module