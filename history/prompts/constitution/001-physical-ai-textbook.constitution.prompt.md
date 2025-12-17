---
id: 001
title: Physical AI Textbook Constitution
stage: constitution
date: 2025-12-16
surface: agent
model: Qwen
feature: none
branch: main
user: user
command: /sp.constitution
labels: [constitution, textbook, ai, robotics]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/spec-template.md
 - .specify/templates/plan-template.md
 - .specify/templates/tasks-template.md
tests:
 - none
---

## Prompt

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.constitution let update with our new idea for a hackathon:  Create a Textbook for Teaching Physical AI & Humanoid Robotics Course
The future of work will be a partnership between people, intelligent agents (AI software), and robots. This shift won't necessarily eliminate jobs but will change what humans do, leading to a massive demand for new skills. We have already written a book on AI agents. Therefore, we want you to write a textbook to teach a course in Physical AI & Humanoid Robotics

## Response snapshot

I've updated the project constitution to align with the hackathon goal of creating a textbook for teaching Physical AI & Humanoid Robotics. Here's what was completed:

1. **Updated Constitution** (.specify/memory/constitution.md):
   - Created a new constitution with 6 core principles focused on educational excellence:
     * Educational Excellence
     * Technical Accuracy  
     * Hands-On Learning Approach
     * Modular Content Design
     * Accessibility & Inclusion
     * Industry Relevance
   - Added sections for Educational Content Standards and Technical Accuracy Requirements
   - Included governance structure for the textbook project

2. **Updated Templates** to align with the textbook focus:
   - spec-template.md: Changed to Chapter Specification template with learning scenarios
   - plan-template.md: Changed to Textbook Development Plan template
   - tasks-template.md: Changed to Learning Scenario task organization

The constitution now properly guides the development of the Physical AI & Humanoid Robotics textbook project with appropriate educational and technical principles.

## Outcome

- ✅ Impact: Updated project constitution and related templates for Physical AI & Humanoid Robotics textbook project
- 🧪 Tests: none required
- 📁 Files: 4 files updated (constitution.md, spec-template.md, plan-template.md, tasks-template.md)
- 🔁 Next prompts: Continue with textbook chapter development
- 🧠 Reflection: The project now has appropriate governance structure for creating educational content focused on Physical AI & Humanoid Robotics

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): not applicable
- Prompt variant (if applicable): not applicable
- Next experiment (smallest change to try): begin developing specific chapters for the textbook