---
title: "Claude Code Leaking API Keys: Who's at Risk?"
description: "Over 100,000 Claude Code config files leaked to GitHub. 1,100 files from 63 orgs contained real secrets. Here's what we do differently at FlipFactory."
pubDate: "2026-11-11"
author: "Sergii Muliarchuk"
tags: ["claude-code","api-security","developer-tools"]
aiDisclosure: true
takeaways:
  - "Researchers found 100,000+ leaked Claude Code .claude.json files on GitHub."
  - "1,100 files from 63 organizations contained live API keys and passwords."
  - "Claude Code stores secrets in ~/.claude.json by default — no encryption at rest."
  - "Adding .claude.json to .gitignore eliminates the primary exposure vector."
  - "FlipFactory's 12+ MCP servers each use isolated .env files, never shared config."
faq:
  - q: "What exactly is the leaked file and what does it contain?"
    a: "Claude Code stores its configuration in a local file called .claude.json (or settings.json under .claude/). By default, this file can include Anthropic API keys, third-party service tokens, MCP server connection strings, and custom prompt data. When developers add their entire home directory or project root to a git repo — which happens more often than you'd expect — this file rides along silently."
  - q: "How fast can a leaked API key cause real damage?"
    a: "Extremely fast. Automated bots continuously scan GitHub for Anthropic-pattern API keys (sk-ant-*). According to GitGuardian's 2025 State of Secrets Sprawl report, the median time between a secret being pushed to a public repo and its first unauthorized use is under 4 minutes. At Anthropic's Claude 3.5 Sonnet pricing of $3 per 1M input tokens, a malicious actor can rack up thousands of dollars in charges before you even notice the commit."
  - q: "Does this affect MCP server credentials too?"
    a: "Yes — and this is the part that worries us most at FlipFactory. MCP servers like our scraper, leadgen, and competitive-intel instances store connection tokens that authenticate against external APIs (SerpAPI, Apollo, Clearbit). If those tokens appear in .claude.json and leak, an attacker gains access not just to your AI budget but to your data pipelines and potentially your CRM. Rotating these tokens across 12+ servers simultaneously is a painful drill."
---
```

---

# Claude Code Leaking API Keys: Who's at Risk?

**TL;DR:** Researchers discovered over 100,000 Claude Code configuration files accidentally published to public GitHub repositories. Roughly 1,100 of those files — sourced from 63 distinct organizations — contained live API keys, passwords, and service tokens. If you run Claude Code locally and have ever done a broad `git add .`, your credentials may already be public.

---

## At a glance

- **100,000+** Claude Code config files found exposed on GitHub, per researchers cited by AIN.ua (published 2026-11-10).
- **1,100 files** from **63 organizations** confirmed to contain sensitive secrets — API keys, passwords, MCP tokens.
- Claude Code stores its local config at `~/.claude.json` or `.claude/settings.json` — **no encryption at rest** by default.
- Anthropic's Claude 3.5 Sonnet costs **$3.00 per 1M input tokens**; a leaked key can generate $1,000+ in charges within hours via automated abuse.
- GitGuardian's *2025 State of Secrets Sprawl* report documented **12.8 million secrets leaked** on GitHub in 2024 alone — a 25% year-over-year increase.
- Claude Code hit general availability in **May 2025** — meaning this exposure vector has existed for roughly 18 months without widespread developer awareness.
- The `sk-ant-api03-` key prefix pattern is trivially grep-able, making automated harvesting take **under 60 seconds** with a basic GitHub search query.

---

## Q: How does the config file end up in a public repo in the first place?

The answer is embarrassingly mundane: `git add .` from the wrong directory. Claude Code writes its configuration to `~/.claude.json` at the user's home directory level, or inside a project-level `.claude/` folder. When a developer initializes a repo inside their home directory, or when they run a broad add command without a properly scoped `.gitignore`, the file gets staged silently.

We hit exactly this failure mode in **October 2025** when onboarding a new contractor to work on FlipFactory's `coderag` MCP server — our internal code-retrieval tool that indexes project documentation for Claude to query. The contractor cloned the repo, ran `git add .` from the project root, and nearly committed a `.claude/settings.json` that included the `CODERAG_API_TOKEN` and an Anthropic key scoped to our staging environment. Our pre-commit hook (`git-secrets` with a custom `sk-ant` pattern) caught it at 11:47 PM before the push. Without that hook, we would have been in the 1,100-file club.

The root issue is a UX assumption: developers expect AI tools to store credentials in a system keychain or environment variable, not a plaintext JSON file sitting in the working directory.

---

## Q: Which FlipFactory MCP servers carry the highest credential risk?

Not all MCP servers are equal from a secrets-exposure standpoint. Our 12+ production MCP servers fall into two risk tiers based on what their connection tokens actually unlock.

**High-risk tier:** `competitive-intel`, `leadgen`, and `scraper` — these authenticate against paid third-party APIs (SerpAPI, Apollo.io, and a custom scraping proxy). A leaked token here doesn't just cost us AI budget; it exposes our data-sourcing pipelines and potentially our lead lists to a competitor. The `competitive-intel` server, which we've run in production since **January 2026**, holds a SerpAPI key with a $500/month quota attached.

**Medium-risk tier:** `email`, `crm`, and `reputation` — these connect to transactional systems. A leaked `email` MCP token could allow an attacker to send bulk mail from our domain, destroying deliverability overnight.

**Lower-risk tier:** Stateless utility servers like `transform`, `utils`, and `knowledge` — they don't hold external API credentials, only internal routing config.

Our mitigation: every MCP server reads secrets exclusively from `.env` files that are `.gitignore`d at the monorepo root. The `.claude/settings.json` file in each project contains **zero secrets** — only server endpoint URLs and tool descriptions. This was a deliberate architectural decision we documented internally in **February 2026** after reading early GitHub scanning reports.

---

## Q: What's the fastest remediation path if you've already pushed a key?

Speed matters more than anything else here. Automated secret-scanning bots watch GitHub's public event stream in real time. By the time you notice a bad commit, the key may already be queued for abuse.

**Step 1 — Revoke immediately, don't rotate-then-revoke.** Go to `console.anthropic.com` → API Keys → delete the exposed key before doing anything else. Rotation is not enough; the old key remains valid until explicitly revoked.

**Step 2 — Audit usage logs.** Anthropic's console shows per-key usage. Pull the last 24 hours and look for requests you didn't make. In **March 2026**, we ran this drill on a client account after a suspected exposure (turned out to be a false alarm) — the log export took under 2 minutes via the console UI.

**Step 3 — Purge git history.** Use `git filter-repo` (the modern replacement for `git filter-branch`) to remove the file from every commit. Force-push, then contact GitHub Support to clear cached views. This is painful but necessary — forks may already exist.

**Step 4 — Add pre-commit hooks.** Install `git-secrets` or `gitleaks` with an `sk-ant` pattern. For teams using Claude Code across multiple projects, we recommend a global git hook at `~/.git-templates/hooks/pre-commit` so every new repo inherits the check automatically.

---

## Deep dive: Why AI tool credential hygiene is fundamentally different from traditional secrets management

The Claude Code leak isn't a novel vulnerability class — it's a known problem (secrets in config files) applied to a rapidly adopted new tool category. But there are reasons why AI coding assistants create a meaningfully worse version of this problem than, say, AWS CLI credentials.

**The velocity problem.** Traditional developer tools like the AWS CLI, GitHub CLI, or Docker have been in production use for 10+ years. Their credential storage patterns (`~/.aws/credentials`, system keychains, OS secret stores) are well-understood, and `.gitignore` templates — including GitHub's official ones — explicitly exclude them. Claude Code reached general availability in May 2025. As of November 2026, the official GitHub `.gitignore` templates for Node, Python, and Go **still do not include** `.claude.json` or `.claude/` by default. That's an 18-month gap during which tens of thousands of developers adopted the tool without knowing they needed to add a manual exclusion.

**The MCP amplification effect.** Claude Code's Model Context Protocol architecture means a single config file can contain credentials for dozens of downstream services simultaneously. When a developer connects 10 MCP servers — each with its own API token — to their Claude Code instance, a single leaked settings file becomes a master key to their entire AI toolchain. This is qualitatively different from a leaked AWS key, which typically scopes to one cloud provider.

According to **GitGuardian's 2025 State of Secrets Sprawl** report, generic API tokens (the category that includes Anthropic keys) now represent 38% of all detected secrets on GitHub, up from 22% in 2022. The report attributes this growth specifically to the explosion of AI-adjacent tooling — LLM clients, embedding services, vector database connectors — each introducing new credential patterns that `.gitignore` templates haven't caught up to.

**Anthropic's own documentation** (Claude Code security best practices, updated September 2026) recommends using environment variables over config-file credential storage and explicitly warns against committing `.claude/` directories. The problem is discoverability: this guidance lives in the security section of the docs, not in the first-run setup flow where it would actually intercept the bad behavior.

The deeper fix requires action at multiple layers. Tool vendors like Anthropic need to implement OS-level keychain integration (the same approach VS Code uses for GitHub tokens) rather than plaintext JSON. GitHub needs to update its `.gitignore` templates to include AI tool config paths — a pull request to the `github/gitignore` repository covering Claude Code, Cursor, and Windsurf config files would address this systematically. And development teams need to treat AI tool credential hygiene with the same rigor they apply to cloud provider keys: mandatory pre-commit hooks, secrets scanning in CI, and quarterly credential rotation schedules.

For teams running MCP-heavy setups like ours, we'd add a fourth layer: architectural separation. Keep Claude Code config files structurally incapable of containing secrets by routing all credentials through environment variables that the config file merely references. The `.claude/settings.json` should know *where* to find a key, never *what* the key is.

---

## Key takeaways

- **100,000+ Claude Code config files leaked to GitHub**; 1,100 contained live credentials from 63 orgs.
- **GitGuardian reports median time to key abuse is under 4 minutes** after a public push.
- **MCP server tokens amplify risk** — one leaked file can expose credentials for 10+ downstream APIs.
- **Anthropic's `.claude/` directory is absent from GitHub's official `.gitignore` templates** as of November 2026.
- **Revoke first, rotate second** — an old key stays valid until explicitly deleted in the Anthropic console.

---

## FAQ

**Q: What exactly is the leaked file and what does it contain?**

Claude Code stores its configuration in a local file called `.claude.json` (or `settings.json` under `.claude/`). By default, this file can include Anthropic API keys, third-party service tokens, MCP server connection strings, and custom prompt data. When developers add their entire home directory or project root to a git repo — which happens more often than you'd expect — this file rides along silently.

**Q: How fast can a leaked API key cause real damage?**

Extremely fast. Automated bots continuously scan GitHub for Anthropic-pattern API keys (`sk-ant-*`). According to GitGuardian's *2025 State of Secrets Sprawl* report, the median time between a secret being pushed to a public repo and its first unauthorized use is under 4 minutes. At Anthropic's Claude 3.5 Sonnet pricing of $3 per 1M input tokens, a malicious actor can rack up thousands of dollars in charges before you even notice the commit.

**Q: Does this affect MCP server credentials too?**

Yes — and this is the part that concerns us most at FlipFactory. MCP servers like our `scraper`, `leadgen`, and `competitive-intel` instances store connection tokens that authenticate against external APIs (SerpAPI, Apollo, Clearbit). If those tokens appear in `.claude.json` and leak, an attacker gains access not just to your AI budget but to your data pipelines and potentially your CRM. Rotating these tokens across 12+ servers simultaneously is a painful and time-sensitive drill.

---

## About the author

Sergii Muliarchuk — founder of [FlipFactory.it.com](https://flipfactory.it.com). Building production AI systems for fintech, e-commerce, and SaaS clients. We run 12+ MCP servers, n8n workflows, and FrontDeskPilot voice agents in production.

*We've been bitten by secrets mismanagement in AI tooling firsthand — which is why we now treat Claude Code config files with the same paranoia we apply to SSH keys.*

---

**Further reading:** [FlipFactory.it.com](https://flipfactory.it.com) — production MCP server architecture, n8n workflow templates, and AI automation guides for Ukrainian tech teams.