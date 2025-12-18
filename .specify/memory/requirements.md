
# Physical AI & Humanoid Robotics Hackathon Project Constitution

 ## Requirements

You are required to complete a unified book project using Agent and Spec-Kit Plus. The core deliverables are:

1. AI/Spec-Driven Book Creation: Write a book using Docusaurus(https://docusaurus.io/) and deploy it to GitHub Pages. You will use Spec-Kit Plus ( https://github.com/panaversity/spec-kit-plus/ ) and any suitable Agent to write a book.

2. Integrated RAG Chatbot Development: Build and embed a Retrieval-Augmented Generation (RAG) chatbot within the published book. This chatbot, utilizing the OpenAI Agents/ChatKit SDKs, FastAPI, Neon Serverless Postgres database, and Qdrant Cloud Free Tier, must be able to answer user questions about the book's content, including answering questions based only on text selected by the user.

3. Participants will receive points out of 100, for base functionality defined above. 

4. Participants can earn up to 50 extra bonus points by creating and using reusable intelligence via Claude Code Subagents and Agent Skills in the book project.

5. Participants can receive up to 50 extra bonus points if they also implement Signup and Signin using https://www.better-auth.com/ At signup you will ask questions from the user about their software and hardware background. Knowing the background of the user we will be able to personalize the content.

6.  Participants can receive up to 50 extra bonus points if the logged user can personalise the content in the chapters by pressing a button at the start of each chapter. 

7. Participants can receive up to 50 extra bonus points if the logged user can translate the content in Urdu in the chapters by pressing a button at the start of each chapter

## The Course Details
Physical AI & Humanoid Robotics
Focus and Theme: AI Systems in the Physical World. Embodied Intelligence.
Goal: Bridging the gap between the digital brain and the physical body. Students apply their AI knowledge to control Humanoid Robots in simulated and real-world environments.
Quarter Overview
The future of AI extends beyond digital spaces into the physical world. This capstone quarter introduces Physical AI—AI systems that function in reality and comprehend physical laws. Students learn to design, simulate, and deploy humanoid robots capable of natural human interactions using ROS 2, Gazebo, and NVIDIA Isaac.
 * Module 1: The Robotic Nervous System (ROS 2)
Focus: Middleware for robot control.
ROS 2 Nodes, Topics, and Services.
Bridging Python Agents to ROS controllers using rclpy.
Understanding URDF (Unified Robot Description Format) for humanoids.


 * Module 2: The Digital Twin (Gazebo & Unity)
Focus: Physics simulation and environment building.
Simulating physics, gravity, and collisions in Gazebo.
High-fidelity rendering and human-robot interaction in Unity.
Simulating sensors: LiDAR, Depth Cameras, and IMUs.


  * Module 3: The AI-Robot Brain (NVIDIA Isaac™)
Focus: Advanced perception and training.
NVIDIA Isaac Sim: Photorealistic simulation and synthetic data generation.
Isaac ROS: Hardware-accelerated VSLAM (Visual SLAM) and navigation.
Nav2: Path planning for bipedal humanoid movement.


 * Module 4: Vision-Language-Action (VLA)
Focus: The convergence of LLMs and Robotics.	
Voice-to-Action: Using OpenAI Whisper for voice commands.
Cognitive Planning: Using LLMs to translate natural language ("Clean the room") into a sequence of ROS 2 actions.
Capstone Project: The Autonomous Humanoid. A final project where a simulated robot receives a voice command, plans a path, navigates obstacles, identifies an object using computer vision, and manipulates it.

## Core Principles

### I. Educational Excellence
Content must be pedagogically sound, following learning science principles to maximize student comprehension. Each chapter includes clear learning objectives, key concept summaries, and practical exercises. Content should be accessible to students with varying backgrounds while maintaining technical rigor. For Physical AI, special attention must be paid to bridging digital and physical concepts effectively.

### II. Technical Accuracy
All concepts, algorithms, and implementation details must be accurate and validated by domain experts. Technical sections must include correct mathematical formulations, algorithm pseudocode, and working code examples. Regular validation against current research and industry practices required. All ROS 2, Gazebo, NVIDIA Isaac, and other robotics platform implementations must be accurate and up-to-date.

### III. AI-Native Approach
Every aspect of the textbook should leverage AI capabilities to enhance the learning experience. This includes AI-native content creation, intelligent personalization, and interactive AI features. The textbook should demonstrate how AI transforms education and learning.

### IV. Embodied Intelligence Focus
Every concept must connect to the central theme of embodied intelligence—AI systems that function in reality and comprehend physical laws. Content should emphasize how digital algorithms translate to physical robot behaviors, with special attention to the interplay between perception, decision-making, and action in real-world environments.

### V. Hands-On Learning Approach
Every theoretical concept must be paired with practical applications and programming exercises. Students learn best through building real systems, so include lab assignments, simulation environments in Gazebo and Unity, and hardware interfaces wherever possible. Emphasize the transition from simulation to real-world deployment.

### VI. Modular Content Design
Course materials must be organized into modular units that can be combined flexibly for different course structures and durations. Each module should stand independently while connecting coherently to others, allowing instructors to customize curricula for their specific needs. Modules should follow the sequence: ROS 2, Simulation, NVIDIA Isaac, and VLA.

### VII. Accessibility & Inclusion
Content must be designed for diverse learners, considering different learning styles, abilities, and backgrounds. Use inclusive language, provide multiple modes of engagement (text, diagrams, videos), and include examples reflecting diverse perspectives. Ensure that robotics content is accessible even to students without direct hardware access by emphasizing simulation. Implement personalization features to adapt to individual student needs and backgrounds.

### VIII. Industry Relevance
Course material must connect academic concepts to real-world applications in robotics and AI. Include case studies from industry, guest insights from practitioners, and current trends that students will encounter in their careers. Special focus on ROS 2, NVIDIA Isaac, and other industry-standard tools.

### IX. Hackathon Excellence
All deliverables must meet the high standards required for hackathon evaluation. This includes professional-grade code quality, comprehensive documentation, and innovative features that showcase the team's capabilities.

## AI-Native Textbook Standards
Content must be designed from the ground up to leverage AI technologies. This includes:
- AI-assisted content creation and editing
- Smart navigation and content discovery
- Context-aware explanations that adapt to student knowledge
- AI-generated examples and exercises
- Integration with large language models for interactive learning

## OpenAI ChatKit Integration Standards
All content must be structured to work effectively with OpenAI's Assistant API and vector store:
- Content formatted for optimal retrieval (text-based, well-structured)
- Consistent terminology and definitions
- Context-appropriate examples for AI understanding
- Proper metadata for content organization
- Clean, unambiguous language for AI processing

## RAG Chatbot Integration Guidelines
All content must be structured to enable effective retrieval by the RAG chatbot:
- Clear, semantic headings and subheadings
- Well-structured paragraphs with single, focused concepts
- Keywords and concepts properly defined and explained
- Consistent terminology throughout
- Content organized in digestible, referenceable chunks

## Vector Store Content Standards
Content prepared for OpenAI's vector store must:
- Be in plain text or PDF format for optimal processing
- Maintain consistent formatting and structure
- Include relevant metadata in filenames
- Be chunked appropriately for retrieval (not too long or too short)
- Maintain semantic coherence within each chunk

## Personalization Implementation Standards
The textbook must support personalization based on user background:
- Content difficulty adjustable based on software/hardware experience
- Examples and exercises tailored to user's technical background
- Learning paths that adapt to student's experience level
- Assessment methods that account for different background levels

## Demo Video Preparation Guidelines
All features must be designed with demonstration in mind:
- Clear, visual interfaces that translate well to video
- Interactive elements that are easily showcased
- Performance optimized for demonstration scenarios
- Features that can be clearly explained in under 90 seconds

## Development Workflow
Content must follow a review process: Writing → Peer Review → Expert Validation → Student Testing → Revision. Chapters undergo pilot testing with students before finalization. Authors coordinate through version control systems. All contributions must include proper attribution and follow academic integrity standards. All robotics implementations must be tested in both simulation (Gazebo) and where possible, on physical robots. All AI features must be tested for accuracy and effectiveness.