# Textbook Development Plan: [CHAPTER]

**Chapter Branch**: `[###-chapter-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Chapter specification from `/specs/[###-chapter-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from chapter spec: primary educational objective + pedagogical approach from research]

## Educational Context

<!--
  ACTION REQUIRED: Replace the content in this section with the pedagogical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Target Audience**: [e.g., undergraduate robotics students, graduate AI researchers, professionals or NEEDS CLARIFICATION]
**Prerequisites**: [e.g., linear algebra, programming fundamentals, basic robotics or NEEDS CLARIFICATION]
**Content Format**: [e.g., narrative text, code examples, mathematical derivations, figures or NEEDS CLARIFICATION]
**Assessment Methods**: [e.g., exercises, labs, projects, quizzes or NEEDS CLARIFICATION]
**Educational Level**: [e.g., introductory, intermediate, advanced, expert or NEEDS CLARIFICATION]
**Learning Goals**: [domain-specific, e.g., 80% concept mastery, 90% exercise completion, practical application or NEEDS CLARIFICATION]
**Constraints**: [domain-specific, e.g., 40-page max, 6-8 hours study time, accessible to diverse learners or NEEDS CLARIFICATION]
**Scope**: [domain-specific, e.g., 1 semester course, 4-week module, 12 lecture series or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file - ensuring alignment with Educational Excellence, Technical Accuracy, Hands-On Learning Approach, Modular Content Design, Accessibility & Inclusion, and Industry Relevance]

## Project Structure

### Documentation (this chapter)

```text
specs/[###-chapter]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command) - if applicable
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── code-examples/       # Phase 1 output (/sp.plan command)
├── figures/             # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Content & Materials (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this chapter. Delete unused options and expand the chosen structure with
  real paths (e.g., chapters/intro, materials/labs). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Textbook chapter (DEFAULT)
chapters/
├── introduction.md
├── [chapter-name].md
├── exercises/
│   ├── basic/
│   ├── intermediate/
│   └── advanced/
└── resources/
    ├── code-examples/
    ├── datasets/
    └── supplementary/

figures/
├── vector/
├── raster/
└── animations/

bibliography/
├── citations.bib
└── references.md

# [REMOVE IF UNUSED] Option 2: Lab-focused chapter (when "hands-on" + "implementation" detected)
labs/
├── [chapter-name]/
│   ├── theory.md
│   ├── implementation.md
│   ├── simulation.md
│   └── exercises.md
├── environment-setup.md
└── troubleshooting.md

# [REMOVE IF UNUSED] Option 3: Hybrid textbook-lab structure (when "theoretical" + "practical" detected)
chapters/
├── theory/
├── practice/
└── integration/

materials/
├── slides/
├── video-scripts/
├── assessments/
└── instructor-guides/
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above, ensuring alignment with constitution principles]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., advanced math requirement] | [conceptual necessity] | [simpler approach lacks rigor] |
| [e.g., sophisticated simulation] | [industry relevance] | [simpler implementation insufficient] |

## MCP Integration Considerations

For resources that are large or require secure access (datasets, simulation environments, code examples), consider using the context7 MCP integration:

- Store large assets in Context7 rather than in the repository
- Use secure access patterns for student materials
- Plan for access control and distribution of educational content
- Consider bandwidth and availability when designing exercises that access remote resources
