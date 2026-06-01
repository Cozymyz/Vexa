# Vexa
Vue External Expressions Architecture

V -- Vue
ex -- External Data/Expression
a -- Architecture

Configuration-Driven Frontend Architecture Framework for Large-scale Vue.js Applications

VEXA is a research-oriented frontend architecture framework designed to improve the analyzability, maintainability, and scalability of large-scale Vue.js applications through explicit dependency modeling and configuration-driven engineering approaches.

![Uploading Vexa architecture overview.png…]()

---

## Motivation

Modern Vue.js applications often suffer from:

* Implicit component-store dependencies
* Complex state management structures
* Architecture erosion over long-term development
* Difficulties in dependency tracking and maintainability
* Inefficient store loading strategies in large-scale systems

VEXA explores a configuration-driven approach to frontend architecture engineering by making architectural relationships explicit and analyzable.

---

## Core Concepts

### Explicit Dependency Modeling

VEXA models relationships between:

* Vue Components
* Vuex / Pinia Modules
* State Dependencies
* Actions and Mutations
* Configuration Metadata

instead of relying on implicit runtime coupling.

---

### Configuration-Driven Frontend Engineering

The framework introduces declarative configuration mechanisms for:

* Dependency definition
* Store loading strategies
* Component-state relationships
* Architecture constraints
* Module orchestration

---

### AST-Based Architecture Analysis

VEXA uses AST-based static analysis pipelines to:

* Extract frontend dependencies
* Analyze architectural structures
* Detect component-store interactions
* Generate analyzable dependency metadata

---

## Architecture Overview

```text
Vue Components
       │
       ▼
AST-based Static Analysis
       │
       ▼
Dependency Extraction
       │
       ▼
Configuration Generation
       │
       ▼
Architecture-aware State Management
       │
       ▼
Demand-driven Module Loading
```

---

## Research Objectives

VEXA aims to explore:

* Architecture-aware frontend engineering
* Dependency analyzability in Vue ecosystems
* Explicit state dependency management
* Configuration-to-code synthesis
* Scalable frontend state orchestration

---

## Features

* AST-based dependency extraction
* Explicit component-store relationship modeling
* Configuration-driven module management
* Demand-driven state loading strategies
* Architecture analyzability support
* Frontend dependency visualization
* Tooling-oriented framework design

---

## Example Workflow

```bash
Analyze Vue.js project
        ↓
Extract dependency graph
        ↓
Generate architecture configuration
        ↓
Optimize state loading strategy
        ↓
Improve analyzability and maintainability
```

---

## Tech Stack

* TypeScript
* Vue.js
* Vuex / Pinia
* AST Analysis
* Babel Parser
* Node.js

---

## Research Context

This project is part of ongoing research on:

> Software Architecture and Dependency Analysis for Large-scale Frontend Systems

conducted at Oita University, Japan.

---

## Publications

* *Vexa: Automated Configuration-to-Code Generation for On-demand State Management in Vue.js Applications* (PX/26, 2026)
* *Vexa: Automated Configuration-to-Code Synthesis for Demand-Driven State Management in Vue Applications* (JSSST 2025)
* *Towards Automation of Module Lazy Loading in Single-Page Web Applications* (APSEC 2024)

---

## Future Work

* Interactive architecture visualization
* Automated architecture recommendation
* Frontend architecture quality metrics
* Dependency evolution analysis
* AI-assisted frontend architecture engineering

---

## Author

Yizhi Mei
Ph.D. Candidate, Oita University
Frontend Software Engineering Research

GitHub: https://github.com/Cozymyz
E-mail:yizhimei0302@gmail.com / v25f1001@oita-u.ac.jp
