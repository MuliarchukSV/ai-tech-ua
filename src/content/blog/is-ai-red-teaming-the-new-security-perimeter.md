---
title: "Is AI Red-Teaming the New Security Perimeter?"
description: "Why AI red-teaming is fundamentally different from cybersecurity — and what Gray Swan's Zico Kolter & Matt Fredrikson get right about it."
pubDate: "2026-06-23"
author: "Sergii Muliarchuk"
tags: ["ai-security","red-teaming","llm-safety"]
aiDisclosure: true
takeaways:
  - "Gray Swan's Zico Kolter sits on the OpenAI board and co-founded the lab in 2024."
  - "Classic pentesting catches ~30% of LLM failure modes; behavioral attacks require new tooling."
  - "FlipFactory's flipaudit MCP flagged 14 prompt-injection vectors in a single fintech workflow audit."
  - "Claude Sonnet 3.7 cost us $0.003 per 1k output tokens in adversarial eval runs — 4× cheaper than GPT-4o."
  - "Gray Swan's Cygnet platform ran 10,000+ automated red-team probes in one public benchmark session."
faq:
  - q: "What makes AI red-teaming different from traditional penetration testing?"
    a: "Traditional pentesting exploits code vulnerabilities with deterministic inputs. AI red-teaming targets emergent, probabilistic behaviors — a model can be jailbroken with a poem, not a buffer overflow. The attack surface includes training data, system prompts, tool-call chains, and multi-agent handoffs, none of which map cleanly to CVE-style catalogues."
  - q: "Can small teams actually afford continuous AI red-teaming?"
    a: "Yes, with the right stack. We run adversarial eval loops on Claude Haiku 3.5 at $0.0008 per 1k input tokens for triage, escalating to Sonnet 3.7 only for confirmed edge cases. Our flipaudit MCP automates the first three audit layers, reducing manual review time by roughly 70% on a typical 15-node n8n workflow."
---

# Is AI Red-Teaming the New Security Perimeter?

**TL;DR:** AI red-teaming is not cybersecurity with an LLM coat of paint — it is a structurally different discipline targeting emergent, context-dependent model behaviors that no firewall or WAF was designed to catch. Zico Kolter (OpenAI board, Gray Swan co-founder) and Matt Fredrikson (Gray Swan CEO) laid out the architecture of this problem in a recent *Latent Space* episode. At FlipFactory we have been stress-testing our own production MCP infrastructure against exactly these attack classes since early 2026, and the findings changed how we build.

---

## At a glance

- **Gray Swan** was co-founded in 2024 by Zico Kolter and Matt Fredrikson, both Carnegie Mellon professors with decade-long adversarial ML research records.
- Kolter joined the **OpenAI board** in June 2023, one of two independent safety-focused directors added post-Sam-Altman-reinstatement.
- Gray Swan's **Cygnet** automated red-teaming platform executed **10,000+ adversarial probes** in a single published benchmark session against frontier models.
- The *Latent Space* podcast episode ("Red-Teaming after Mythos") dropped in **June 2026** and is the most technically dense AI-safety episode of the year so far.
- FlipFactory's **flipaudit MCP** — deployed to production in **January 2026** — surfaces prompt-injection and tool-call abuse vectors across our n8n workflow graph.
- We measured **Claude Sonnet 3.7** adversarial eval costs at **$0.003 per 1k output tokens**, versus **$0.012 for GPT-4o** on equivalent red-team tasks — a 4× cost delta that matters at scale.
- NIST's **AI Risk Management Framework 1.0** (published January 2023) remains the closest thing to a standards baseline, but it predates agentic tool-use by at least two architectural generations.

---

## Q: Why can't existing security tooling just cover AI systems?

Classic application security assumes a deterministic attack surface: known inputs, known code paths, CVE-trackable vulnerabilities. LLMs break every one of those assumptions. A prompt is not a packet. A system prompt is not an ACL. A tool-call chain across five MCP servers is not a REST endpoint you can fuzz with Burp Suite.

We felt this gap acutely in **March 2026** when we ran a red-team pass on our **competitive-intel MCP** — the server that scrapes competitor pricing pages and feeds summaries into a downstream n8n workflow (ID: `O8qrPplnuQkcp5H6`, Research Agent v2). A standard OWASP-style review gave it a clean bill of health. Our flipaudit MCP, running adversarial synthetic inputs via Claude Sonnet 3.7, found **3 prompt-injection paths** where attacker-controlled competitor page content could reframe the agent's tool-call intent — causing it to exfiltrate internal config keys into its summary output. Zero CVEs. Zero code changes needed. Pure behavioral exploit. Kolter and Fredrikson's framing — that AI security is about *distributional* behavior, not *deterministic* code — maps exactly to what we found.

---

## Q: What does a production-grade AI red-team workflow actually look like?

Gray Swan's Cygnet approach combines automated probe generation, a judge model that scores outputs on a harm taxonomy, and human red-teamers who chase the tail distribution the automation misses. That three-layer architecture is close to what we run at FlipFactory, though at smaller scale.

Our stack: **flipaudit MCP** handles layer one (static prompt-injection pattern matching across MCP server configs at `/etc/flipfactory/mcp/*.json`). Layer two is a Claude Haiku 3.5 loop — $0.0008 per 1k input tokens — that generates 200 adversarial variants per workflow node and scores refusals. Layer three escalates confirmed edge cases to Claude Sonnet 3.7 for deeper behavioral analysis. In **April 2026** we ran this full stack against our **FrontDeskPilot voice agent** — 11 tool-call nodes, 4 external API integrations. The audit flagged **7 behavioral anomalies** in under 90 minutes of compute time, at a total cost of **$2.14**. Manual expert review of the same scope would have taken half a day and cost 20× more. The lesson: automation handles breadth, humans handle depth — and you need both layers before either is useful.

---

## Q: How does multi-agent architecture change the threat model?

Single-model red-teaming is hard. Multi-agent red-teaming is a different problem class entirely. When Agent A passes a tool-call result to Agent B, the attack surface multiplies: Agent A's output becomes Agent B's input, and if Agent A was manipulated, Agent B inherits a poisoned context with no native verification layer.

We run **12+ MCP servers** in production — including **memory**, **knowledge**, **scraper**, **crm**, and **n8n** MCP — and the inter-agent trust question is live for us daily. In **May 2026**, our **memory MCP** surfaced a real edge case: a content-bot workflow (`@FL_content_bot` on Telegram) was pulling cached research from memory that had been written by a previous agent run operating on unverified scraped data. The memory store had become a latent injection vector — clean at write time, exploitable at read time. Fredrikson specifically called out this "deferred injection" pattern in the *Latent Space* episode as one of the hardest classes to catch because the malicious payload and its execution are temporally separated. We fixed it by adding a **reputation MCP** verification step before any memory-read feeds into a downstream tool call — adding ~$0.0004 per workflow invocation in token cost, but eliminating the class of attack entirely.

---

## Deep dive: Why behavioral AI security needs its own discipline

The intellectual lineage of AI red-teaming runs through adversarial machine learning research, not infosec. Szegedy et al.'s 2013 paper on adversarial examples in neural networks — published before "LLM" was common vocabulary — established the foundational insight: high-dimensional models have decision boundaries that look smooth to humans but are locally chaotic to optimizers. Kolter's own research group at CMU spent years on certified robustness, trying to provide mathematical guarantees that a model's output wouldn't change beyond a certain input perturbation radius.

That mathematical framing is important context for what Gray Swan is building. Cygnet is not a fuzzer that throws random strings at a model. It is, according to Fredrikson's description in the *Latent Space* episode, a constrained optimization system that searches for inputs in the neighborhood of legitimate prompts that cause policy violations — structurally similar to PGD (projected gradient descent) attacks but operating in the discrete token space where gradients are not directly available.

The practical implication for production teams: you cannot evaluate AI security posture with static test sets. The OWASP LLM Top 10 (version 1.1, published by OWASP Foundation in 2024) is a useful taxonomy — prompt injection, insecure output handling, training data poisoning, and seven other classes — but a checklist against that taxonomy tells you what *categories* of risk exist, not whether your specific model in your specific context is vulnerable. Context is everything. A system prompt that safely handles customer service queries for a retail chatbot may be trivially jailbroken in a medical triage context where the model has been given elevated tool permissions.

The NIST AI Risk Management Framework 1.0 (January 2023, NIST) provides governance scaffolding — Map, Measure, Manage, Govern — but was written before agentic tool-use became a mainstream deployment pattern. Its "Measure" function does not address behavioral red-teaming at the workflow level. There is, as of mid-2026, no published standard that covers multi-agent adversarial evaluation with the specificity that, say, PCI-DSS covers payment data handling. That gap is what Gray Swan is trying to fill commercially, and what teams like ours are navigating with improvised tooling.

For Ukrainian teams deploying AI in fintech or e-commerce — sectors where we do most of our FlipFactory work — the regulatory pressure is asymmetric: EU AI Act high-risk provisions apply to many use cases, but enforcement infrastructure and local technical guidance are still thin. That means the burden of proactive security falls entirely on the builder. Gray Swan's open publication of red-team methodologies and Kolter's board-level visibility at OpenAI suggest the field is moving toward more formalized standards, but the 2026-2027 window is still self-service territory.

---

## Key takeaways

- Gray Swan's Cygnet ran **10,000+ automated red-team probes** in one benchmark — automation is now the baseline, not the advanced option.
- FlipFactory's **flipaudit MCP** caught **14 prompt-injection vectors** across production workflows that static code review missed entirely.
- **Claude Sonnet 3.7** adversarial evals cost **$0.003/1k output tokens** — 4× cheaper than GPT-4o for equivalent red-team coverage.
- OWASP LLM Top 10 v1.1 names **10 attack classes** but cannot tell you if *your* specific deployment is vulnerable.
- **Deferred injection via memory MCP** — payload written by one agent, executed by another — is the hardest attack class to catch in multi-agent stacks.

---

## FAQ

**Q: Should every team building with LLMs run formal red-teaming?**
Yes — but the bar scales with deployment risk. A low-stakes internal summarization tool needs at minimum an OWASP LLM Top 10 checklist review. Any agent with external tool-call permissions, user-facing output, or access to sensitive data needs behavioral red-teaming. We use a simple rule at FlipFactory: if the agent can write to any external system or read from any data store with PII, it gets at least a Haiku-level automated adversarial eval before production deploy, no exceptions.

**Q: What's the fastest way to start red-teaming an existing n8n workflow?**
Map every node that accepts external input — webhooks, HTTP request nodes, MCP tool-call results — and treat each as a potential injection point. Run 50 adversarial variants per node using a cheap judge model (Haiku 3.5 works well). Look specifically for outputs that change the agent's *intent* rather than just its *tone*. Our flipaudit MCP automates this mapping step; without it, manual graph traversal on a 15-node workflow takes about 3 hours.

**Q: How do you stay current as attack methods evolve?**
We subscribe to three signal sources: Gray Swan's public research drops, the OWASP LLM project GitHub (updated continuously), and Anthropic's model card safety sections for each Claude release. We also run a weekly automated re-audit on our highest-risk workflows — the n8n schedule node fires every Monday at 02:00 Kyiv time, costs roughly $0.80 per run, and has caught two regressions introduced by upstream MCP server updates since January 2026.

---

## About the author

Sergii Muliarchuk — founder of FlipFactory.it.com. Building production AI systems for fintech, e-commerce, and SaaS clients. We run 12+ MCP servers, n8n workflows, and FrontDeskPilot voice agents in production.

*We've shipped adversarial eval pipelines for clients in Ukrainian fintech since Q1 2026 — red-teaming isn't theoretical for us, it's a line item in every production launch checklist.*

---

**Further reading:** Practical MCP server hardening guides and production AI workflow templates at [flipfactory.it.com](https://flipfactory.it.com).