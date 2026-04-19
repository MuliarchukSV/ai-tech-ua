---
title: "Why Companies Learn About Breaches From News Reports"
description: "Analysis of the cybersecurity detection gap: why organizations discover they're hacked from media instead of their own systems."
pubDate: "2026-04-19"
author: "FlipFactory Editorial Team"
tags: ["cybersecurity", "threat-detection", "incident-response", "enterprise-security", "Ukraine"]
aiDisclosure: true
takeaways:
  - "Average breach detection time globally reached 207 days in 2023, per IBM Security."
  - "68% of breaches are discovered by external parties rather than internal security teams."
  - "Multi-stage cyberattacks now use 3-5 different techniques to evade traditional detection systems."
  - "Ukrainian businesses face 2.5x more cyberattacks than pre-2022 levels due to geopolitical factors."
faq:
  - q: "Why do companies often learn about their data breaches from news outlets?"
    a: "Most organizations lack real-time threat detection capabilities and rely on signature-based security tools that miss novel attacks. According to IBM's Cost of a Data Breach Report, the mean time to identify a breach is 207 days globally. External security researchers, journalists, or law enforcement often discover and report breaches before internal teams detect anomalies in their systems, especially when attackers use sophisticated evasion techniques."
  - q: "What are multi-stage cyberattacks and why are they harder to detect?"
    a: "Multi-stage attacks involve several distinct phases—reconnaissance, initial access, lateral movement, data exfiltration—spread across weeks or months. Attackers deliberately use different tools and techniques at each stage to avoid triggering security alerts. Traditional security systems examine events in isolation rather than correlating activities across time, making it difficult to distinguish attack sequences from legitimate business operations until significant damage occurs."
  - q: "How can Ukrainian companies improve their breach detection capabilities?"
    a: "Organizations should implement Security Operations Centers (SOCs) with 24/7 monitoring, deploy behavioral analytics and AI-powered threat detection tools, conduct regular penetration testing, and establish threat intelligence sharing programs. Investing in endpoint detection and response (EDR) solutions and training security teams on emerging attack patterns significantly reduces detection time from months to days or hours."
---

## TLDR

The cybersecurity paradox facing modern businesses is stark: companies routinely discover they've been hacked not through their sophisticated security systems, but from journalists calling for comment. According to IBM's 2023 Cost of a Data Breach Report, the average time to identify a breach is 207 days—nearly seven months of undetected access. More troubling, 68% of breaches are discovered by external parties rather than internal security teams. For Ukrainian businesses operating under heightened geopolitical threats, this detection gap represents an existential risk. The evolution of multi-stage cyberattacks, which deliberately fragment malicious activity across multiple techniques and timeframes, has rendered traditional signature-based security tools largely ineffective. Understanding why this detection failure occurs—and how to address it—is critical for any organization handling sensitive data in 2026.

## The Detection Time Paradox: Why Seven Months Is the New Normal

The cybersecurity industry faces an uncomfortable truth: despite billions invested in security tools, attackers maintain operational access for months before detection. IBM Security's research reveals that breached organizations took an average of 207 days to identify intrusions in 2023, with an additional 73 days required for containment. This 280-day total lifecycle means attackers have nearly ten months to achieve their objectives.

Why does detection take so long? Modern attacks deliberately exploit the gap between event occurrence and pattern recognition. Attackers spread malicious activities across extended timeframes, making individual actions appear legitimate when examined in isolation. A login from an unusual location might generate an alert, but when that login occurs at 3 AM on a Saturday, followed by small data transfers over subsequent weeks, correlation becomes exponentially harder.

Traditional security tools operate on signature-based detection—they recognize known threats but struggle with novel techniques. According to Verizon's 2023 Data Breach Investigations Report, 74% of breaches involved a human element, including social engineering and credential misuse, which don't trigger conventional malware signatures. Organizations discover breaches externally because journalists, security researchers, or law enforcement connect dots that siloed security systems cannot.

## Multi-Stage Attacks: The New Operational Playbook

Cybercriminals have professionalized their operations with military-style planning. Multi-stage attacks now represent the dominant threat model, involving distinct phases executed over weeks or months. These operations typically follow a pattern: reconnaissance, initial access, privilege escalation, lateral movement, data staging, and exfiltration—each phase using different tools and techniques.

Research from Mandiant shows that sophisticated threat actors now use an average of 3-5 different attack techniques per intrusion, deliberately varying their methods to evade detection systems. An attack might begin with a spear-phishing email, progress to exploiting a zero-day vulnerability, continue with credential harvesting through legitimate administrative tools, and conclude with data exfiltration disguised as normal cloud backup traffic.

For Ukrainian organizations, this threat is particularly acute. The State Service of Special Communications reported that Ukrainian businesses experienced 2.5 times more cyberattacks in 2023 compared to pre-2022 levels, with attackers increasingly employing sophisticated multi-stage techniques. These aren't opportunistic criminals but well-resourced groups with geopolitical motivations and advanced capabilities.

The fragmentation of attack stages defeats traditional security monitoring. Each individual action—a password reset, file access, network connection—appears innocuous. Only when viewed holistically do these activities reveal malicious intent, requiring security operations that most organizations haven't implemented.

## The External Discovery Problem: When Reporters Know First

The phenomenon of companies learning about breaches from journalists represents a fundamental failure in security architecture. According to Ponemon Institute's 2024 study, 68% of data breaches are discovered by external parties—security researchers, customers, law enforcement, or media—rather than internal teams. This external discovery pattern indicates that detection systems are monitoring the wrong indicators.

Why do journalists sometimes know before CISOs? Attackers often sell stolen data on dark web marketplaces or use it for public campaigns, which security researchers monitoring these channels discover. A security journalist monitoring breach forums might spot a company's data for sale and reach out for comment before that company's security team notices unusual database queries from months earlier.

This external-first discovery creates catastrophic response delays. When breaches are detected internally, organizations can investigate scope, contain damage, and prepare communications before public disclosure. External discovery forces reactive crisis management, with legal, PR, and technical teams scrambling while under public scrutiny. The reputational damage multiplies when companies appear unaware of their own security incidents.

For technology providers like FlipFactory (flipfactory.it.com), which handle client data and infrastructure, implementing proactive threat hunting and behavioral analytics isn't optional—it's a competitive differentiator. Organizations that discover breaches internally average $1.02 million less in breach costs compared to external discovery, according to IBM's research.

## What Led Us Here: The Evolution of Cybersecurity Failure

Understanding today's detection crisis requires examining how we arrived at this point. The cybersecurity industry has historically operated on a reactive model—identify threats, create signatures, deploy updates. This worked when attacks were relatively simple and attackers lacked resources. The transformation occurred around 2010-2015 as cybercrime professionalized and nation-state actors entered the commercial space.

Three converging trends created the current crisis. First, digital transformation massively expanded attack surfaces. Cloud adoption, remote work, and IoT deployments created exponentially more entry points than traditional perimeter defenses could monitor. Second, the commoditization of attack tools democratized sophisticated techniques—capabilities once limited to intelligence agencies became available to any criminal with budget for ransomware-as-a-service.

Third, defenders suffered from alert fatigue and tool sprawl. The average enterprise now deploys 45-75 different security tools, according to IBM Security, generating thousands of alerts daily. Security teams become overwhelmed, focusing on urgent tactical responses rather than strategic threat hunting. Critical signals disappear in noise.

For Ukrainian organizations, geopolitical factors accelerated these challenges. The necessity of rapid digital transformation under wartime conditions meant security sometimes became secondary to operational continuity. Organizations deployed new systems quickly, creating visibility gaps that sophisticated attackers exploit.

## What Comes Next: AI-Powered Detection and Threat Intelligence

The future of breach detection lies in artificial intelligence and behavioral analytics that identify anomalies rather than signatures. Modern security platforms use machine learning to establish baselines of normal organizational behavior, flagging deviations that indicate potential threats. These systems analyze patterns across months of data, connecting subtle indicators that human analysts would miss.

Gartner predicts that by 2025, 60% of organizations will use AI-powered threat detection, reducing mean time to detect by 40-60%. These platforms correlate data from endpoints, networks, cloud environments, and identity systems, creating holistic visibility. When an account begins accessing unusual file types, communicating with atypical external IPs, and transferring data outside normal patterns—even if each action individually appears legitimate—AI detection flags the behavioral sequence.

We expect increased adoption of Security Operations Centers (SOCs) powered by automation and threat intelligence sharing. Organizations will shift from reactive security to proactive threat hunting, with dedicated teams searching for indicators of compromise before attackers achieve their objectives. For Ukrainian businesses, regional threat intelligence sharing through organizations like CISO Club Ukraine becomes critical for early warning.

The economic incentives align with this shift. IBM's research shows that organizations with fully deployed AI and automation saved $1.76 million compared to those without these capabilities. The cost of advanced detection becomes justified when measured against breach costs averaging $4.45 million globally.

## Actionable Framework: Building Detection That Actually Works

Organizations must fundamentally redesign security operations around several principles. First, implement continuous monitoring with behavioral analytics rather than relying solely on signature-based tools. Deploy Endpoint Detection and Response (EDR) solutions that monitor all endpoint activities, correlating events across time to identify attack sequences. According to Microsoft's 2024 Digital Defense Report, organizations with EDR deployed detected breaches 87% faster than those without.

Second, establish threat hunting capabilities. Don't wait for alerts—proactively search for indicators of compromise. Dedicate resources to examining anomalies in authentication patterns, data access behaviors, and network traffic. Hypothesis-driven hunting, where teams investigate specific threat scenarios, identifies sophisticated attacks that automated tools miss.

Third, invest in threat intelligence and information sharing. Join industry-specific Information Sharing and Analysis Centers (ISACs) and regional cybersecurity organizations. For Ukrainian companies, participation in threat intelligence exchanges provides early warning about techniques targeting similar organizations. External intelligence supplements internal telemetry, creating comprehensive threat awareness.

Fourth, conduct regular penetration testing and red team exercises. Understanding how attackers would compromise your environment reveals detection gaps. Organizations should test not just perimeter defenses but full attack chains—can security teams detect lateral movement, credential harvesting, and data exfiltration?

Finally, measure and optimize detection metrics. Track mean time to detect, incident response time, and detection source (internal versus external). Set organizational goals for reducing detection time from months to weeks, then days. Regular tabletop exercises ensure that when detection occurs, response processes function efficiently.

---

**Key Takeaways:**

- Average breach detection time globally reached 207 days in 2023, per IBM Security
- 68% of breaches are discovered by external parties rather than internal security teams
- Multi-stage cyberattacks now use 3-5 different techniques to evade traditional detection systems
- Ukrainian businesses face 2.5x more cyberattacks than pre-2022 levels due to geopolitical factors
- Organizations with AI-powered detection save $1.76 million in breach costs versus those without