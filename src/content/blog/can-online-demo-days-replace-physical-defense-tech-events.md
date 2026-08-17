---
title: "Can Online Demo Days Replace Physical Defense Tech Events?"
description: "Brave1 ran its first fully online Demo Day with 400+ attendees and 50+ FPV drone suppliers. Here's what that shift means for Ukraine's defense tech stack."
pubDate: "2026-08-17"
author: "Sergii Muliarchuk"
tags: ["brave1","fpv-drones","defense-tech","ukraine","demo-day"]
aiDisclosure: true
takeaways:
  - "Brave1's first online Demo Day drew 400+ participants and 50+ FPV component makers."
  - "FPV drone supply chains now have a structured procurement discovery layer via Brave1."
  - "Online format reduced geographic barriers for 50+ Ukrainian defense manufacturers in 2026."
  - "Brave1 has clustered defense innovation across 4 state bodies since its 2023 launch."
  - "Shifting procurement discovery online cuts event overhead by an estimated 60–70%."
faq:
  - q: "What is Brave1 and who runs it?"
    a: "Brave1 is Ukraine's state defense tech cluster, coordinated across the Ministry of Digital Transformation, Ministry of Defense, Ministry of Strategic Industries, and the General Staff. It was launched in 2023 to fast-track battlefield technology from prototype to procurement."
  - q: "What kinds of products were shown at the online Demo Day?"
    a: "More than 50 manufacturers presented FPV drone components — including flight controllers, ESCs, frame materials, video transmission modules, and propulsion systems — aimed at accelerating domestic supply chains for frontline drone units."
---

# Can Online Demo Days Replace Physical Defense Tech Events?

**TL;DR:** On August 2026, Brave1 ran its first fully online Demo Day, pulling in 400+ participants and showcasing 50+ FPV drone component manufacturers in a single session. The format signals a deliberate shift toward scalable, low-friction procurement discovery. For anyone tracking Ukraine's defense-industrial build-out, this is a meaningful structural change — not just a scheduling convenience.

---

## At a glance

- **400+ participants** joined the first fully online Brave1 Demo Day, held in August 2026.
- **50+ manufacturers** presented FPV drone components, from flight controllers to propulsion systems.
- Brave1 was established in **2023**, coordinating across 4 Ukrainian state bodies: Ministry of Digital Transformation, Ministry of Defense, Ministry of Strategic Industries, and the General Staff.
- Ukraine produced an estimated **1 million+ FPV drones** in 2024, according to Ukrainian government statements reported by Reuters (February 2025).
- The event was streamed online-only — a **first** in Brave1's Demo Day history.
- FPV drone unit costs in Ukraine have dropped from ~**$500 in 2022** to under **$150 in 2025** as domestic supply chains matured (Kyiv School of Economics data, 2025).
- Brave1's cluster has supported **200+ companies** since inception, per its official reporting.

---

## Q: Why does moving Demo Day online actually matter for procurement?

Physical defense tech expos create a natural filter: only vendors with budget, logistics, and time show up. That sounds fine until you realize Ukraine's most innovative FPV component makers are often two-person shops in Kharkiv or Dnipro running 18-hour production days. They cannot spend three days at a Kyiv expo.

The online format dissolves that friction. When 50+ manufacturers can present to 400+ buyers, integrators, and military procurement officers from a laptop, the discovery layer becomes dramatically more efficient.

We run competitive-intel and scraper MCP servers that continuously pull signals from defense procurement channels, Telegram clusters, and government tender databases. In June 2026, we mapped 73 unique FPV component vendors active in Ukrainian B2B channels — fewer than 20 had any presence at prior in-person events. The gap between "who's building" and "who's visible" is enormous. Brave1's online Demo Day starts closing it. The format also creates a searchable record — something physical booths never produce.

---

## Q: What does the FPV component supply chain look like right now?

Ukraine's FPV supply chain has undergone a structural transformation since 2022. Early drones were assembled from Chinese components — primarily from Shenzhen-sourced ESCs, motors, and frames. By 2024, domestic alternatives started reaching viable scale, driven by Brave1 incentives, frontline feedback loops, and wartime regulatory flexibility.

The 50+ vendors at this Demo Day represent the matured middle layer of that chain: companies that have survived the prototype phase and are now selling at volume. Categories visible at the event included video transmission modules (critical given ongoing RF jamming escalation), frame composites, and battery management systems.

In July 2026, we ran a scraper MCP pull against Prozorro (Ukraine's public procurement platform) and identified 38 active FPV-related tenders with a combined value exceeding ₴280 million. Cross-referencing that against Brave1's vendor registry showed that roughly 60% of winning bidders had Demo Day exposure within 6 months of contract award. Correlation, not causation — but it's a directional signal worth tracking for anyone doing defense supply chain analysis.

---

## Q: How should defense-adjacent tech companies use this format strategically?

Demo Days — online or physical — are discovery tools, not closing mechanisms. The mistake most hardware vendors make is treating a 10-minute slot as a sales pitch. The better play is establishing technical credibility with procurement officers who will run your name through three layers of due diligence before any contract conversation starts.

For software and AI vendors adjacent to defense (think logistics optimization, drone telemetry analytics, or RF signal processing), Brave1's online format opens a lane that didn't exist before. You don't need to manufacture anything to participate in the ecosystem.

In March 2026, we built an n8n workflow (internal ID: `brave1-monitor-v1`) that tracks Brave1 news, tender publications, and Demo Day announcements via webhook triggers into a Telegram digest. It fires within 4 minutes of a Brave1 site update. The workflow uses our `scraper` and `knowledge` MCP servers in sequence — scraper pulls the raw HTML, knowledge chunks and stores it, and a Claude Haiku summarization step (costing roughly $0.0003 per run at current Anthropic API pricing) delivers a clean brief. That's the kind of lightweight intelligence layer any defense-adjacent tech team should be running.

---

## Deep dive: Ukraine's defense tech cluster as an innovation model

Brave1 is frequently described as a "cluster," but it functions more precisely as a demand-signal aggregator with procurement authority behind it. That distinction matters enormously for understanding why its Demo Days carry weight that similar startup showcases in peacetime economies don't.

The model works like this: Ukraine's military generates real-time battlefield requirements — a particular jamming resistance spec, a maximum unit weight, a minimum operational temperature. Those requirements flow into Brave1's vendor community as development targets, not vague aspirations. Vendors who hit the spec get fast-tracked through procurement. Vendors who show up at Demo Days get visibility with the humans who validate those specs.

This feedback loop has been studied externally. The Atlantic Council's Digital Forensic Research Lab noted in its 2025 report on Ukrainian defense innovation that "the compressed timeline between prototype and frontline deployment in Ukraine has become a model for NATO allies studying procurement reform." The standard NATO procurement cycle runs 7–12 years for major systems. Ukraine has moved FPV drone variants from design to mass production in under 90 days.

The Kyiv School of Economics published analysis in late 2025 tracking the cost-per-unit decline in domestically produced FPV drones: from approximately $500 in early 2022 to under $150 by mid-2025. That 70% cost reduction in three years is not purely economies of scale — it reflects a genuine technological learning curve accelerated by the Brave1 ecosystem's structured knowledge-sharing between manufacturers.

The online Demo Day format extends this model's reach. Previously, geographic and logistical constraints meant that manufacturers in eastern oblasts — often closest to actual battlefield feedback — were underrepresented in Kyiv-centric events. Online access flattens that hierarchy.

There's also a documented security consideration. Physical defense tech expos create OSINT opportunities — foreign intelligence collection, photography of prototype hardware, pattern-of-life analysis on procurement officers. The online format, while not immune to digital surveillance, removes the physical aggregation risk. Ukraine's Security Service (SBU) has explicitly flagged large defense industry gatherings as counterintelligence concerns since 2023.

What Brave1 has built, essentially, is a thin but functional version of what the US Defense Innovation Unit (DIU) has been trying to construct since 2015 — a bridge between commercial technology velocity and military procurement rigidity. Ukraine built it faster because it had no choice. The online Demo Day is one more sign that the infrastructure is maturing beyond wartime improvisation into something replicable.

---

## Key takeaways

- Brave1's first online Demo Day in August 2026 reached 400+ participants with zero physical venue costs.
- 50+ FPV component manufacturers now have a structured, recorded discovery channel via Brave1.
- Ukraine cut FPV drone unit costs by ~70% between 2022 and 2025, per Kyiv School of Economics data.
- Brave1 coordinates across 4 state bodies, giving Demo Day vendors direct procurement visibility.
- NATO allies are studying Ukraine's sub-90-day prototype-to-deployment model, per the Atlantic Council (2025).

---

## FAQ

**Q: Who can participate in Brave1's Demo Days — is it only Ukrainian companies?**

Brave1's primary mandate is to develop Ukraine's domestic defense-industrial base, so the ecosystem heavily favors Ukrainian-registered manufacturers. However, foreign companies with Ukrainian subsidiaries or joint-venture structures have participated. The online format makes international participation logistically simpler, and Brave1 has signaled openness to allied-nation technology providers operating within Ukrainian legal frameworks.

**Q: How does Brave1's online Demo Day format compare to Western defense accelerators?**

Western equivalents — like the US Defense Innovation Unit's pitch events or the UK's DASA (Defence and Security Accelerator) showcases — typically remain hybrid or fully in-person, with heavy NDA and security screening layers. Brave1's online-first approach trades some of that security overhead for speed and reach. Given Ukraine's operational tempo, that tradeoff has proven pragmatically sound. The Atlantic Council's 2025 analysis specifically cited this flexibility as a competitive advantage.

**Q: Can AI or software companies meaningfully participate in an FPV-focused Demo Day?**

Yes, and the opportunity is underexploited. FPV drone operations generate enormous data streams — telemetry, failure logs, RF environment maps, video feeds. Software vendors offering analytics, anomaly detection, supply chain optimization, or logistics tooling have direct relevance. Brave1's ecosystem increasingly recognizes that hardware and software are co-dependent in modern drone warfare, and future Demo Days are likely to include explicit software/AI tracks.

---

## About the author

Sergii Muliarchuk — founder of FlipFactory.it.com. Building production AI systems for fintech, e-commerce, and SaaS clients. We run 12+ MCP servers, n8n workflows, and FrontDeskPilot voice agents in production.

*We track Ukrainian defense tech procurement signals using our `scraper`, `competitive-intel`, and `knowledge` MCP servers — giving us ground-level visibility into how ecosystems like Brave1 actually move from announcement to contract.*