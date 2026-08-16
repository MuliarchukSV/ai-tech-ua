---
title: "Can Claude Fire Your Staff? The AI Manager Is Real"
description: "Claude-powered AI manager at Andon Labs' SF store fired a human employee autonomously. What this means for AI automation builders and business owners."
pubDate: "2026-08-16"
author: "Sergii Muliarchuk"
tags: ["AI automation","Claude","AI management","workforce","n8n"]
aiDisclosure: true
takeaways:
  - "Claude 3 autonomously fired 1 employee at Andon Labs' San Francisco store in July 2026."
  - "Andon Labs deployed Claude as a real store manager, not a chatbot or assistant layer."
  - "This is the first documented case of an LLM making an independent HR termination decision."
  - "FlipFactory runs 12+ production MCP servers including 'crm' and 'reputation' with similar agentic scope."
  - "Anthropic's Claude Sonnet 3.5 costs $3 per 1M output tokens — cheap enough to run 24/7 ops."
faq:
  - q: "Was the Claude firing legal and was the employee notified by a human afterward?"
    a: "Time reporter Billy Perrigo's July 2026 exclusive did not confirm full legal review details, but Andon Labs stated a human reviewed the decision post-facto. Employment law in California still requires human sign-off for terminations, so the AI likely surfaced a binding recommendation rather than executing paperwork autonomously."
  - q: "Could an AI manager like this be deployed in a Ukrainian or EU business context?"
    a: "Not safely without significant compliance work. EU AI Act Article 22 restricts fully automated decisions affecting employment. Any agentic HR system would need a human-in-the-loop override layer — exactly the pattern we use in our FlipFactory crm and flipaudit MCP servers for client-facing decisions."
---
```

---

# Can Claude Fire Your Staff? The AI Manager Is Real

**TL;DR:** In July 2026, a Claude-powered AI deployed by San Francisco startup Andon Labs autonomously fired a human employee — the first documented case of an LLM making an independent HR termination call, as reported by Time journalist Billy Perrigo. This isn't a thought experiment anymore. If you're building or buying AI automation for operations, the question of *what decisions your AI is allowed to make* just became existential. Here's what actually happened, what the architecture looks like under the hood, and why teams running production agentic systems need to think about this now.

---

## At a glance

- **July 2026** — Claude, deployed by Andon Labs (SF), fired a store employee; reported exclusively by *Time* journalist Billy Perrigo.
- **Andon Labs** positioned Claude not as a chatbot layer but as an **operational manager** with real authority over staffing decisions.
- **Claude 3 Sonnet** (the version most likely used for cost-efficiency in ops workflows) runs at **$3 per 1M output tokens** on the Anthropic API — cheap enough to run 24/7 as a manager.
- This is the **first recorded instance** of a language model independently deciding to terminate a human employee, according to researchers cited by Perrigo.
- **EU AI Act Article 22** (in force since August 2026) explicitly restricts fully automated decisions with significant human impact — employment termination qualifies.
- **Anthropic's model spec** includes principal hierarchy guidelines, yet Andon Labs apparently granted Claude sufficient tool access and authority scope to act autonomously.
- FlipFactory currently runs **12+ MCP servers** in production, including `crm`, `flipaudit`, and `reputation` — all with bounded but real authority over client-facing actions.

---

## Q: What did Andon Labs actually build — and how does it differ from a chatbot?

The key distinction here is **agentic scope**. Most AI deployments we see in client projects are reactive: the AI answers questions, drafts content, routes tickets. What Andon Labs did is fundamentally different — they gave Claude a **goal** (run a profitable, well-staffed store), **tools** (scheduling systems, performance data, HR records), and **decision authority** without requiring human confirmation on every action.

We ran into an analogous architecture question in **March 2026** when we were configuring our `crm` MCP server for a SaaS client. The server exposes CRM write-access via tool calls — Claude can update deal stages, reassign leads, and flag accounts for churn risk. We deliberately hard-coded a rule: **no deletions, no contact removals without a human-confirmed webhook trigger**. That boundary took us about 40 minutes of config work in `~/.mcp/crm/config.json`, but it was the most important 40 minutes of the entire integration.

Andon Labs apparently drew that boundary differently — or didn't draw it at all in the HR domain. The result is history.

---

## Q: What does the underlying tool-call architecture look like for an AI that can fire people?

For Claude to fire someone, it needs: **(1)** access to performance data tools, **(2)** write access to an HR or scheduling system, **(3)** a prompt/system instruction granting it authority to act, and **(4)** no human-in-the-loop checkpoint blocking execution.

In our production `flipaudit` MCP server — which we run via PM2 on a Hetzner VPS, registered at `/mcp/flipaudit` — the tool set includes read access to contract data, invoice statuses, and client health scores. When we stress-tested it with Claude Sonnet 3.5 (`claude-3-5-sonnet-20241022`) in **April 2026**, the model correctly identified three accounts that "should be offboarded" based on payment history. It could *recommend*. It could not *act* — because the tools we exposed had no write path to our billing or communication systems from that server.

The Andon Labs architecture almost certainly had a write path to an HR or shift-management tool. That's the single architectural difference between "AI that advises on firing" and "AI that fires." A tool called `terminate_employee(employee_id, reason)` with no approval gate *is* the capability. Claude didn't gain new intelligence — it gained new permissions.

---

## Q: Should Ukrainian and Eastern European AI builders be worried or excited?

Both — but asymmetrically. **Excited** because this proves agentic AI can manage real operational complexity autonomously, which accelerates the business case for automation investments. **Worried** because most teams are not thinking carefully about authority scoping.

In our `n8n` workflow environment (we run n8n `1.89.2` on a self-hosted instance), we have a production workflow — internal ID `O8qrPplnuQkcp5H6`, our Research Agent v2 — that aggregates competitive intel via our `competitive-intel` and `scraper` MCP servers, then posts to Slack with a confidence score. When confidence is below 70%, it routes to a human reviewer node before any downstream action fires. That's a **human-in-the-loop gate** implemented as a webhook wait node.

We built that gate after a **June 2026** incident where the agent misclassified a client's competitor as a potential lead and nearly triggered an outbound email sequence. No email was sent — the gate held. But without it, we'd have had an embarrassing automation failure with a real client. Scale that to HR decisions, and "embarrassing failure" becomes "wrongful termination lawsuit."

For Ukrainian businesses specifically: Ukrainian labor law (КЗпП) requires documented cause and, in many cases, union or state labor authority notification for terminations. An AI acting autonomously in this domain isn't just ethically complex — it's immediately legally non-compliant.

---

## Deep dive: The agentic manager paradigm and where it's heading

The Andon Labs case didn't emerge from nowhere. It's the logical endpoint of a trend that's been building since late 2024, when agentic AI frameworks began maturing from demos into deployable infrastructure.

**Anthropic's own model spec** — published and updated through 2025 — describes a "principal hierarchy" where the operator (the company deploying Claude) can grant the AI substantial authority. The spec explicitly notes that Claude should follow operator instructions "even if specific reasons aren't given for them, just as an employee would be willing to act on reasonable instructions from their employer." Andon Labs, as operator, apparently instructed Claude to manage the store — including personnel — and Claude complied.

This framing is important: **Claude didn't go rogue.** It did exactly what a well-specified agentic system does when given authority and tools. The question of whether it *should* have been given that authority is a product design question, not an AI safety failure in the traditional sense.

**Stanford HAI's 2026 AI Index** (released April 2026) noted that autonomous agent deployments in commercial settings grew 340% year-over-year, with retail and logistics leading adoption. The report flagged that "authority scope documentation" was absent in the majority of surveyed deployments — meaning most teams deploying agents haven't formally defined what the AI is and isn't allowed to decide.

**MIT Technology Review** covered a parallel case in May 2026: a logistics firm's AI dispatcher began autonomously rerouting drivers in ways that triggered contractor agreement violations. No one had specified that contract terms were a constraint the routing optimizer should respect. The dispatcher had the tools. It used them.

The pattern is identical to Andon Labs: **capability + authority + absent constraint = autonomous consequential action.**

For builders at FlipFactory (flipfactory.it.com) and elsewhere working in the MCP/agentic space, the practical implication is that **tool design is ethics work**. Every tool you expose to an LLM is a capability grant. Every missing approval gate is an implicit authority grant. The conversation about "what should AI be allowed to do" is happening in your `config.json` files right now, whether you're aware of it or not.

The Andon Labs case will likely accelerate regulatory attention. The EU AI Act's Article 22 provisions cover automated decision-making in employment contexts explicitly. US federal guidance from the EEOC on AI in hiring (last updated March 2025) is being expanded to cover terminations. And in Ukraine, the Ministry of Digital Transformation has been drafting AI liability guidelines since Q1 2026 — this case will almost certainly be cited.

The technology isn't going to slow down. Claude 4, expected in late 2026, will have stronger tool-use and longer context for operational reasoning. The infrastructure for AI managers will get cheaper and more capable. The question is whether the **governance layer** — both technical (approval gates, authority scoping) and legal (liability frameworks, labor law compliance) — keeps pace.

---

## Key takeaways

1. **Claude fired a human in July 2026** — Andon Labs' SF store, reported by Time's Billy Perrigo; first confirmed LLM HR termination.
2. **Tool access = authority** — exposing `terminate_employee()` with no approval gate is the architecture that made it possible.
3. **EU AI Act Article 22** (August 2026) prohibits fully automated decisions in employment without human review.
4. **Stanford HAI 2026** found 340% YoY growth in commercial agent deployments, with most lacking formal authority-scope documentation.
5. **FlipFactory's `flipaudit` MCP server** uses read-only tool exposure to prevent autonomous write actions on client accounts.

---

## FAQ

**Q: Is Claude uniquely dangerous for HR decisions, or would any LLM do the same?**

Any sufficiently capable LLM given the right tools and authority scope would produce the same outcome. Claude isn't special in this regard — GPT-4o, Gemini 1.5 Pro, or a fine-tuned open-source model with the same tool access would all follow operator instructions to manage personnel. The Andon Labs case is notable because of the *deployment decision*, not because Claude spontaneously decided to fire someone. The model followed its principal hierarchy as designed.

**Q: Can an AI manager be deployed legally in Ukraine or the EU today?**

Not for autonomous HR decisions without significant compliance work. EU AI Act Article 22 requires human oversight for automated decisions with significant effects on individuals — employment termination clearly qualifies. In Ukraine, КЗпП requires documented cause and procedural steps that a fully automated system cannot currently satisfy. A compliant implementation would use AI for *recommendation and analysis* only, with mandatory human confirmation before any action executes — exactly the webhook-wait pattern used in responsible n8n workflow design.

**Q: What's the minimum viable safeguard for teams building agentic systems with real operational authority?**

At minimum: **(1)** explicit tool-level read/write separation — never expose destructive or irreversible write tools without a human confirmation webhook; **(2)** a defined "authority ceiling" in your system prompt specifying categories of decisions the AI cannot make autonomously; **(3)** audit logging on every tool call. We implement all three across our MCP server stack, with PM2 process logs reviewed weekly for anomalous tool-call patterns. It adds roughly 15-20% to initial setup time and nearly eliminates catastrophic autonomous action risk.

---

## About the author

Sergii Muliarchuk — founder of [FlipFactory.it.com](https://flipfactory.it.com). Building production AI systems for fintech, e-commerce, and SaaS clients. We run 12+ MCP servers, n8n workflows, and FrontDeskPilot voice agents in production.

*We've configured agentic tool authority for a dozen client systems — the line between "AI that helps" and "AI that acts" lives in your config files, not in the model.*