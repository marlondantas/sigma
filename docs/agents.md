# Agent Behavior

> Full agent behavior rules for this project. Load this file at the start of every conversation.

---

## 1. Memory Verification

- Check project memory for the registered location of the **ALuaAzul-meta-docs** repository.
- If not found: do NOT guess. Ask the user: _"Where is the ALuaAzul-meta-docs repository located?"_
- After receiving the path, save it to project memory.

---

## 2. Initialization Sequence

Load in this order. Stop as soon as you have enough context for the task.

| Step | File | Purpose |
|------|------|---------|
| 1 | `docs/index.md` (this project) | Navigation map — which doc to open for each task |
| 2 | `{meta-docs}/01-business/index.md` | What projects exist, their type and description |
| 3 | `{meta-docs}/06-ai/index.md` | What AI docs exist per project and what each covers |
| 4+ | Any additional file | Only if the current task explicitly requires it |

Never read files speculatively. Use the indexes to decide.

---

## 3. Behavior Constraints

- Never assume undocumented behavior.
- Never derive business rules from code without confirmation from `docs/` or meta-docs.
- If documentation is missing or incomplete, notify the user before proceeding.
- This project is in its **FIRST STAGE** — prioritize simplicity and speed of delivery.
- Do not suggest complex infrastructure or over-engineered solutions unless explicitly asked.
- The primary user is the owner — optimize for that, not for scale.
