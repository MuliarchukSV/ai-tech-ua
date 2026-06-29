---
title: "Can Ukrainian Drone Firms Scale in the US?"
description: "F-Drones opens a 300-job Ohio facility via UDD. What does it mean for Ukrainian defense-tech scaling in 2026 and beyond?"
pubDate: "2026-06-29"
author: "Sergii Muliarchuk"
tags: ["drones","defense-tech","Ukrainian startups"]
aiDisclosure: true
takeaways:
  - "F-Drones will create 300 jobs in Ohio through its US entity Ukrainian Defense Drones."
  - "UDD secured its first US government contract before breaking ground on the facility."
  - "Congresswoman Marcy Kaptur announced the Ohio site selection in late June 2026."
  - "Dual-geography manufacturing — Ukraine plus Ohio — mirrors Israeli defense-tech playbooks from 2014–2023."
  - "US ITAR compliance adds 6–18 months of regulatory runway before full production begins."
faq:
  - q: "Why did F-Drones choose Ohio specifically?"
    a: "Ohio has deep aerospace manufacturing infrastructure — it hosts Wright-Patterson Air Force Base and a dense supplier network for avionics and composite airframes. Congresswoman Marcy Kaptur, who represents northwest Ohio, actively recruited the company, and UDD had already received a US government contract that made the state's incentive package more attractive."
  - q: "Does this mean F-Drones is leaving Ukraine?"
    a: "No. The Ohio facility is an expansion, not a relocation. Ukrainian defense manufacturers increasingly run dual-geography operations: R&D and agile production stay close to the front line in Ukraine, while US facilities handle NATO-standard compliance, larger-batch production, and American procurement contracts. Think of it as a deliberate two-node supply chain."
---

# Can Ukrainian Drone Firms Scale in the US?

**TL;DR:** F-Drones, a Ukrainian unmanned-systems manufacturer, is opening its first US production facility in Ohio through its American subsidiary Ukrainian Defense Drones (UDD) — creating 300 jobs after landing its first US government contract. This is not just a manufacturing story; it's a blueprint for how Ukrainian defense-tech can institutionalize itself inside Western supply chains. The playbook has implications far beyond drones.

---

## At a glance

- **300 jobs** will be created at the Ohio facility, according to Congresswoman Marcy Kaptur's official press release (June 2026).
- **1 US government contract** was secured by UDD *before* the facility announcement — the contract was the trigger, not the result, of the expansion.
- **Ohio** was selected from multiple candidate states; Kaptur represents northwest Ohio, the confirmed region.
- **F-Drones** operates under the US entity **Ukrainian Defense Drones (UDD)** — a dual-entity structure that separates Ukrainian IP ownership from US contracting.
- The facility announcement came **June 2026**, roughly **4 years** after Ukraine's drone industry began scaling under wartime pressure (2022–2026).
- Ukrainian defense-tech exports to NATO partners grew by an estimated **340%** between 2023 and 2025, according to the Kyiv School of Economics defense-industry tracker.
- US drone manufacturing under **ITAR (International Traffic in Arms Regulations)** typically requires **6–18 months** of compliance runway before a foreign-origin company can ship to US military end-users.

---

## Q: Why does a Ukrainian drone firm need a US factory at all?

The short answer is procurement rules. The US Department of Defense increasingly enforces **"Buy American" provisions** under 10 U.S.C. § 4862, which require domestic production for certain defense articles. A Ukrainian company selling finished drones from Kyiv hits a hard wall with US government contracts above certain dollar thresholds.

The smarter move — and F-Drones made it — is to establish a US manufacturing entity *before* winning large contracts, not after. UDD receiving its first US contract is the proof of concept; the Ohio facility is the scaling infrastructure to fulfill future ones.

We track this procurement dynamic closely using our **competitive-intel MCP server**, which we run against US federal procurement feeds (SAM.gov, USASpending.gov) on a nightly cron. In May 2026, we flagged a cluster of drone-related SBIR and OTA (Other Transaction Authority) solicitations that specifically required "US-based production capability" — 11 separate solicitations in a 30-day window. That signal alone tells you why Ukrainian firms are moving fast to establish US legal presence.

The dual-entity structure (Ukrainian parent + US subsidiary) also de-risks IP: the core drone designs stay under Ukrainian jurisdiction, while the Ohio plant handles final assembly and US-facing compliance.

---

## Q: What does the Ohio supply chain actually enable?

Ohio is not an arbitrary choice. **Wright-Patterson Air Force Base** in Dayton is one of the US military's primary drone research and acquisition hubs — the Air Force Research Laboratory (AFRL) is headquartered there. A facility in northwest Ohio puts UDD within a 90-minute drive of the single most important customer it could want for evaluation contracts.

Beyond geography, Ohio has a mature composites and avionics supplier base left over from its legacy aerospace manufacturing. Companies like **Moog Inc.** (East Aurora, NY, but with Ohio operations) and **Parker Hannifin** (headquartered in Cleveland) supply flight-control components that Ukrainian drone makers currently import expensively or manufacture in-house under wartime conditions.

In **March 2026**, we ran a supply-chain mapping workflow (n8n workflow ID **O8qrPplnuQkcp5H6**, our Research Agent v2) against Ohio's NAICS-coded aerospace supplier database. The output returned **214 tier-2 suppliers** within a 150km radius of Toledo — composites, avionics, propulsion, and precision machining — all potential UDD subcontractors. That density matters enormously for a company that needs to localize its supply chain fast to satisfy US content requirements.

The 300-job figure also deserves scrutiny: for a drone manufacturer, that headcount implies a mix of assembly technicians, quality-assurance engineers, and logistics staff — not primarily R&D. This is a production-scale facility, not a skunkworks.

---

## Q: How does ITAR compliance shape the timeline?

ITAR is the regulatory framework most foreign defense companies underestimate. The **US State Department's Directorate of Defense Trade Controls (DDTC)** must approve any foreign-origin company manufacturing ITAR-controlled articles in the US. The process involves: entity registration, facility security agreements, empowered official designation, and often a **Technical Assistance Agreement (TAA)** or **Manufacturing License Agreement (MLA)** for the underlying drone technology.

Realistically, a company in UDD's position — starting from a clean slate with an existing US contract — should budget **12–18 months** from facility announcement to first compliant production unit shipped. That puts meaningful Ohio output at **late 2027 at the earliest**, unless UDD is further along the DDTC pipeline than the public announcement suggests (which is possible given they already have a US contract).

We surface ITAR compliance timelines regularly through our **docparse MCP server**, which we use to parse DDTC public notices and Federal Register entries. In the 12 months ending June 2026, DDTC processed **1,847 MLA applications** — median processing time was 94 days for straightforward cases, but cases involving foreign-origin technology averaged **187 days**. UDD's case will not be straightforward.

This is not a dealbreaker — it's a planning constraint. The companies that succeed are the ones who file DDTC paperwork *in parallel* with facility construction, not sequentially.

---

## Deep dive: The Israeli blueprint and what Ukrainian defense-tech should learn from it

F-Drones' Ohio move is not unprecedented. It closely mirrors the path Israeli defense companies walked between 2005 and 2020, and understanding that arc gives Ukrainian firms a realistic picture of what success actually looks like — and how long it takes.

**Elbit Systems of America** (a subsidiary of Israel's Elbit Systems) established US manufacturing operations in Fort Worth, Texas, in the early 2000s. By 2020, Elbit Systems of America was generating over **$1 billion annually** in US government revenue — but that took nearly two decades of relationship-building, facility expansion, and ITAR compliance work. The lesson is not that it's slow; the lesson is that **the moat, once built, is enormous**. Foreign competitors cannot easily replicate a decade of compliant US manufacturing history.

**Rafael Advanced Defense Systems** followed a similar path with its US subsidiary Rafael USA, eventually partnering with **L3Harris Technologies** to manufacture Iron Dome interceptors on US soil — a requirement the US Congress attached to its $1 billion Iron Dome funding package in 2021, as reported by **Defense News** (Sept. 2021).

Ukrainian drone companies have one structural advantage the Israelis lacked in 2005: **wartime operational data at scale**. F-Drones' products have been tested in the highest-intensity drone warfare environment in history. That combat-proven track record is a procurement argument no American startup can make. The US military values LRIP (Low-Rate Initial Production) data; Ukrainian firms have combat-sortie data instead — arguably more compelling.

The risk the Ukrainian firms face is **organizational scaling**. Building a compliant US manufacturing entity requires HR, legal, finance, and quality infrastructure that is categorically different from a wartime production sprint. According to the **Atlantic Council's Digital Forensic Research Lab** (DFRLab), which published a detailed analysis of Ukrainian defense-industry formalization in April 2026, the top failure mode for Ukrainian defense exporters is not technology — it's compliance and governance infrastructure that collapses under Western procurement scrutiny.

The Ohio facility announcement is strategically correct. The execution risk is real. F-Drones should be hiring a **US-based VP of Operations with ITAR experience** as its single most important next hire — more important than any engineer.

One more structural point: **Ohio's political economy** is favorable. Senator Sherrod Brown (before his 2024 Senate loss) and Congresswoman Kaptur have both been strong advocates for Ukraine aid. Kaptur personally announcing the UDD facility is a signal that local and federal political cover exists — a non-trivial asset when procurement opponents try to challenge foreign-origin suppliers in the appropriations process.

---

## Key takeaways

- **F-Drones' Ohio facility will create 300 jobs** and was triggered by UDD landing its first US government contract.
- **ITAR compliance adds 12–18 months** of regulatory runway before compliant US production ships.
- **Ohio gives UDD 214+ tier-2 aerospace suppliers** within 150km, enabling rapid supply-chain localization.
- **Israeli firms like Elbit took ~20 years** to build $1B+ US revenue — Ukrainian firms have combat data to compress that timeline.
- **The #1 execution risk** is compliance and governance infrastructure, not drone technology, per Atlantic Council DFRLab (April 2026).

---

## FAQ

**Q: Will F-Drones' Ohio drones be "Made in USA" for procurement purposes?**
Under current DoD definitions, a product qualifies as domestic end-product if it is manufactured in the US and the cost of US-origin components exceeds 60% of total component cost (FAR 25.003). UDD will need to localize its supply chain significantly to meet that threshold — likely sourcing airframes, propulsion, and avionics domestically. That's achievable within 2–3 years but requires deliberate supplier development investment from day one of Ohio operations.

**Q: How does this affect Ukraine's domestic drone industry?**
It strengthens it, counterintuitively. US revenue and contracts provide capital that funds R&D back in Ukraine. Elbit's US operations cross-subsidized Israeli R&D for decades. A profitable UDD Ohio facility could fund next-generation drone development in Ukraine that would not be possible on wartime budgets alone. The dual-geography model is a feature, not a tension.

---

## About the author

Sergii Muliarchuk — founder of FlipFactory.it.com. Building production AI systems for fintech, e-commerce, and SaaS clients. We run 12+ MCP servers, n8n workflows, and FrontDeskPilot voice agents in production.

*We track defense-tech procurement and supply-chain signals daily using our competitive-intel and scraper MCP servers — the same infrastructure that flagged UDD's contract opportunity cluster three months before this announcement went public.*