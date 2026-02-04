---
name: zsh-expert-guidelines
description: Expert Zsh Configuration Guide. Rules for modifying config.zsh, using modules, and leveraging built-in aliases/utils.
metadata:
  author: yanis
  version: "1.0.0"
  argument-hint: <topic-or-command>
---

# Zsh Expert Guidelines

Guide de référence pour la gestion de la configuration Zsh (Zsh Boost).

## Priorités

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Configuration | HIGH | `config-` |
| 2 | Workflow | MEDIUM | `workflow-` |
| 3 | Capabilities | LOW | `capabilities-` |

## Quick Reference

### 1. Configuration (HIGH)

- `config-architecture` - Edit `config.zsh`, not `.zshrc`.

### 2. Workflow (MEDIUM)

- `workflow-reload` - Use `rld` to reload config.
- `workflow-add-module` - Create new modules in `modules/`.

### 3. Capabilities (LOW)

- `capabilities-utils` - `mkcd`, `myip`, `backup`, `trash`...
- `capabilities-aliases` - `eza`, `bat`, `rg`, `zoxide`.

## Full Guide

For the complete guide: `AGENTS.md`

## Usage

Reference individual rules in `rules/*.md` before proposing configuration changes or explaining available tools.
