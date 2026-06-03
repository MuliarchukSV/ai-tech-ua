import type { BlogConfig } from './template/blog.config.ts';

const config: BlogConfig = {
  name: "AI Техно",
  homeTitle: "AI інструменти та автоматизація для бізнесу — огляди та гайди | AI Техно",
  description: "Штучний інтелект та технології для українського ринку",
  site: "https://ai-tech.com.ua",
  language: "uk",
  niche: "AI/tech news for Ukrainian market",
  colors: { primary: "#0057b7", accent: "#ffd700" },
  analytics: { plausibleDomain: "ai-tech.com.ua" },
  author: {
    type: 'Person',
    name: 'Sergii Muliarchuk',
    url: '/author',
    bio: 'Сергій Мулярчук — засновник FlipFactory, агенції AI-автоматизації, що будує продакшн AI-системи (MCP-сервери, n8n-воркфлоу, голосові агенти) для fintech, e-commerce та SaaS клієнтів.',
    sameAs: [
      'https://www.linkedin.com/in/sergii-muliarchuk/',
      'https://github.com/MuliarchukSV',
    ],
  },
};

export default config;
