---
title: "03. Nodes as Cognitive Units"
sidebar_label: "03 Nodes as Cognitive Units"
---

# Nodes as Cognitive Units

Each ROS 2 node functions as a cognitive microservice. This chapter covers best practices for dividing responsibilities, sharing parameters, and instrumenting nodes for telemetry.

- Break behavior into short-lived nodes that only solve one piece of the control puzzle.
- Use parameters and dynamic reconfigure to adjust logic at runtime.
- Add logging and diagnostics that can trace across node boundaries.
