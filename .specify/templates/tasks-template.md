---

description: "Task list template for textbook chapter development"
---

# Tasks: [CHAPTER NAME]

**Input**: Design documents from `/specs/[###-chapter-name]/`
**Prerequisites**: plan.md (required), spec.md (required for learning scenarios), research.md, data-model.md (if applicable), code-examples/

**Assessments**: The examples below include assessment tasks. Assessments are OPTIONAL - only include them if explicitly requested in the chapter specification.

**Organization**: Tasks are grouped by learning scenario to enable independent development and testing of each scenario.

## Format: `[ID] [P?] [Scenario] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Scenario]**: Which learning scenario this task belongs to (e.g., LS1, LS2, LS3)
- Include exact file paths in descriptions

## Path Conventions

- **Textbook project**: `chapters/`, `exercises/`, `figures/` at repository root
- **Lab-focused**: `labs/`, `exercises/`, `code-examples/`
- **Hybrid**: `chapters/`, `materials/`, `assessments/`
- Paths shown below assume textbook project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - Learning scenarios from spec.md (with their priorities P1, P2, P3...)
  - Educational requirements from plan.md
  - Key concepts from spec.md
  - Code examples from code-examples/

  Tasks MUST be organized by learning scenario so each scenario can be:
  - Developed independently
  - Tested independently with students
  - Integrated as a complete learning module

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for textbook development

- [ ] T001 Create project structure per textbook development plan
- [ ] T002 Initialize content repository with bibliography and reference system
- [ ] T003 [P] Configure document formatting and style guidelines

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core educational infrastructure that MUST be complete before ANY learning scenario can be developed

**⚠️ CRITICAL**: No learning scenario work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Setup common notation and mathematical conventions for robotics/AI
- [ ] T005 [P] Establish code style and programming language conventions
- [ ] T006 [P] Prepare figure and diagram templates for consistency
- [ ] T007 Create foundational concepts that all scenarios depend on
- [ ] T008 Configure assessment rubrics and evaluation criteria
- [ ] T009 Setup simulation or hardware environment requirements (if applicable)

**Checkpoint**: Foundation ready - learning scenario development can now begin in parallel

---

## Phase 3: Learning Scenario 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what students learn from this scenario]

**Independent Assessment**: [How to verify students have mastered this scenario]

### Assessments for Learning Scenario 1 (OPTIONAL - only if assessments requested) ⚠️

> **NOTE: Write these assessments FIRST, ensure they represent valid learning objectives**

- [ ] T010 [P] [LS1] Create concept check for [key concept] in exercises/basic/[concept].md
- [ ] T011 [P] [LS1] Design practical exercise for [application] in exercises/practical/[app].md

### Development for Learning Scenario 1

- [ ] T012 [P] [LS1] Develop [Concept1] explanation in chapters/[chapter-name]/[concept1].md
- [ ] T013 [P] [LS1] Develop [Concept2] explanation in chapters/[chapter-name]/[concept2].md
- [ ] T014 [LS1] Create practical application content in chapters/[chapter-name]/application.md (depends on T012, T013)
- [ ] T015 [LS1] Add code examples for [algorithm/concept] in code-examples/[chapter-name]/[file].py
- [ ] T016 [LS1] Include mathematical formulations and derivations
- [ ] T017 [LS1] Add accessibility annotations and diverse examples for user story 1

**Checkpoint**: At this point, Learning Scenario 1 should be fully developed and assessable independently

---

## Phase 4: Learning Scenario 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what students learn from this scenario]

**Independent Assessment**: [How to verify students have mastered this scenario]

### Assessments for Learning Scenario 2 (OPTIONAL - only if assessments requested) ⚠️

- [ ] T018 [P] [LS2] Create concept check for [key concept] in exercises/basic/[concept].md
- [ ] T019 [P] [LS2] Design practical exercise for [application] in exercises/practical/[app].md

### Development for Learning Scenario 2

- [ ] T020 [P] [LS2] Develop [Concept] explanation in chapters/[chapter-name]/[concept].md
- [ ] T021 [LS2] Create practical application content in chapters/[chapter-name]/application.md
- [ ] T022 [LS2] Add code examples for [algorithm/concept] in code-examples/[chapter-name]/[file].py
- [ ] T023 [LS2] Integrate with Learning Scenario 1 concepts (if needed)

**Checkpoint**: At this point, Learning Scenarios 1 AND 2 should both be independently functional

---

## Phase 5: Learning Scenario 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what students learn from this scenario]

**Independent Assessment**: [How to verify students have mastered this scenario]

### Assessments for Learning Scenario 3 (OPTIONAL - only if assessments requested) ⚠️

- [ ] T024 [P] [LS3] Create concept check for [key concept] in exercises/basic/[concept].md
- [ ] T025 [P] [LS3] Design practical exercise for [application] in exercises/practical/[app].md

### Development for Learning Scenario 3

- [ ] T026 [P] [LS3] Develop [Concept] explanation in chapters/[chapter-name]/[concept].md
- [ ] T027 [LS3] Create practical application content in chapters/[chapter-name]/application.md
- [ ] T028 [LS3] Add code examples for [algorithm/concept] in code-examples/[chapter-name]/[file].py

**Checkpoint**: All learning scenarios should now be independently functional

---

[Add more learning scenario phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple learning scenarios

- [ ] TXXX [P] Content consistency review across all chapters
- [ ] TXXX Educational narrative flow improvements
- [ ] TXXX Technical accuracy verification across all scenarios
- [ ] TXXX [P] Accessibility compliance check for all content
- [ ] TXXX Industry relevance validation with current practices
- [ ] TXXX Run student pilot test validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all learning scenarios
- **Learning Scenarios (Phase 3+)**: All depend on Foundational phase completion
  - Learning scenarios can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired learning scenarios being complete

### Learning Scenario Dependencies

- **Learning Scenario 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other scenarios
- **Learning Scenario 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with LS1 but should be independently assessable
- **Learning Scenario 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with LS1/LS2 but should be independently assessable

### Within Each Learning Scenario

- Assessments (if included) SHOULD be designed early to guide content development
- Foundational concepts before advanced topics
- Theory before practical applications
- Core concepts before integrations
- Scenario complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all learning scenarios can start in parallel (if team capacity allows)
- All assessments for a learning scenario marked [P] can run in parallel
- Explanations within a scenario marked [P] can run in parallel
- Different learning scenarios can be worked on in parallel by different team members

---

## Parallel Example: Learning Scenario 1

```bash
# Develop all assessments for Learning Scenario 1 together (if assessments requested):
Task: "Create concept check for [key concept] in exercises/basic/[concept].md"
Task: "Design practical exercise for [application] in exercises/practical/[app].md"

# Develop all explanations for Learning Scenario 1 together:
Task: "Develop [Concept1] explanation in chapters/[chapter-name]/[concept1].md"
Task: "Develop [Concept2] explanation in chapters/[chapter-name]/[concept2].md"
```

---

## Implementation Strategy

### MVP First (Learning Scenario 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all scenarios)
3. Complete Phase 3: Learning Scenario 1
4. **STOP and VALIDATE**: Pilot test Learning Scenario 1 with students
5. Iterate based on feedback if needed

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add Learning Scenario 1 → Test with students → Refine (MVP!)
3. Add Learning Scenario 2 → Test with students → Refine
4. Add Learning Scenario 3 → Test with students → Refine
5. Each scenario adds value without breaking previous scenarios

### Parallel Team Strategy

With multiple educators/content creators:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Educator A: Learning Scenario 1
   - Educator B: Learning Scenario 2
   - Educator C: Learning Scenario 3
3. Scenarios develop and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Scenario] label maps task to specific learning scenario for traceability
- Each learning scenario should be independently developable and assessable
- Assess concepts align with learning objectives
- Commit after each task or logical group
- Stop at any checkpoint to pilot test scenario independently
- Avoid: vague tasks, same file conflicts, cross-scenario dependencies that break independence
- Ensure all content meets constitution principles: Educational Excellence, Technical Accuracy, Hands-On Learning Approach, Modular Content Design, Accessibility & Inclusion, Industry Relevance
- For resources that are large or require secure access, consider using the context7 MCP integration to store and distribute materials
- When creating code examples that access external resources, use the context7 integration appropriately while maintaining security
