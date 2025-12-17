---
id: 006
title: Project Cleanup and Guide Creation
stage: general
date: 2025-12-16
surface: agent
model: Qwen
feature: none
branch: main
user: user
command: manual cleanup
labels: [cleanup, guide, dependencies, github]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - GUIDE.md
 - requirements.txt
 - ai_examples/ (removed)
 - sim_examples/ (removed)
 - course-outline.md (removed)
 - DOCKER_SETUP.md (removed)
 - docker-compose.yml (removed)
 - Dockerfile.ai (removed)
 - Dockerfile.base (removed)
 - Dockerfile.sim (removed)
 - Dockerfile.textbook (removed)
 - docker/ (removed)
 - specs/ (removed)
 - PROJECT_PLAN.md (removed)
tests:
 - none
---

## Prompt

ok now remove all unneccary file and planes was added before and add packages dependencies required in this project and write a comprehensive guide.md to add env keys name and explain to move forward with push code to github

## Response snapshot

I have successfully cleaned up the project by removing unnecessary files and directories, created a comprehensive guide for setting up the Physical AI & Humanoid Robotics textbook project, and updated the dependencies. 

The following files/directories were removed as they were not essential for the hackathon project:
- ai_examples/ directory
- sim_examples/ directory
- course-outline.md
- DOCKER_SETUP.md
- docker-compose.yml
- All Dockerfile.* files
- docker/ directory
- specs/ directory
- PROJECT_PLAN.md

The following were created/updated:
- GUIDE.md: A comprehensive guide with environment setup, dependencies, and GitHub push instructions
- requirements.txt: Updated with all necessary dependencies for the hackathon project

The current project structure now contains only the essential components for the hackathon:
- api/ - Backend API with FastAPI
- auth/ - Authentication system using Better-Auth
- chatbot/ - RAG chatbot implementation
- docusaurus/ - Docusaurus frontend for the textbook
- i18n/ - Internationalization (Urdu translation)
- personalization/ - Content personalization features
- modules/ - Course module content
- docs/ - Additional documentation
- history/ - Prompt history records
- .specify/ and .qwen/ - Configuration directories

The GUIDE.md includes:
- Required environment variables with instructions on how to obtain them
- Complete dependency lists for both backend (Python) and frontend (Node.js)
- Step-by-step setup instructions
- GitHub repository setup and push instructions
- Project structure overview
- Development workflow instructions

## Outcome

- ✅ Impact: Cleaned up project structure for hackathon submission
- 🧪 Tests: none required
- 📁 Files: 1 created, 1 updated, 10 removed
- 🔁 Next prompts: Ready for GitHub deployment
- 🧠 Reflection: Project now properly structured for hackathon with essential components only

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): not applicable
- Prompt variant (if applicable): not applicable
- Next experiment (smallest change to try): push to GitHub repository