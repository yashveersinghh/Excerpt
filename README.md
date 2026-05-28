# Excerpt

*Excerpt* refers to a short extract or preview from a larger piece of writing.

*Excerpt* is a full-stack blogging platform inspired by the Medium aesthetic, built to explore modern edge computing architecture, scalable data modeling, and seamless AI integration.

## Live

🔗 https://excerpt-blog.vercel.app

---

## Preview

![Preview](./Frontend/public/demo.png)

---

## Features

* **AI-Powered Summaries:** Uses the Google Gemini 2.5 Flash model on the edge to automatically generate a concise, two-sentence summary for published blog posts.
* **Global Edge Backend:** Powered by Hono and running with ultra-low latency on Cloudflare Workers.
* **Secure Authentication:** Context-aware JWT session verification combined with password hashing via bcrypt.
* **Media Management:** Integrated with Cloudinary for handling and serving blog cover image uploads.
* **Type-Safe Architecture:** End-to-end data validation utilizing Zod schemas alongside Prisma ORM for database access.
* **Minimalist UI:** Responsive, mobile-first frontend featuring clean typography, loading skeletons, and a modern editorial layout.

---

# Tech Stack

## Frontend
* React (Vite)
* TypeScript
* Tailwind CSS
* Axios

## Backend
* Hono
* Cloudflare Workers
* Prisma ORM
* PostgreSQL
* Zod
* JWT / bcrypt

## AI & Services
* Google AI Studio (Gemini API)
* Cloudinary
* Vercel

---

# What I Learned

This project provided deep insight into building modern, serverless architectures:

* **Serverless Edge Compute:** Adapting standard Node.js authentication and data flow patterns to work efficiently within the V8 isolate-based Cloudflare Workers runtime.
* **Edge-Compatible AI Routing:** Integrating lightweight LLM prompts inside stateless backend routing environments, managing secrets safely via edge context environment bindings.
* **Relational Data Modeling:** Designing structured blogging schemas and managing database connections efficiently using Prisma and a cloud PostgreSQL database.
* **Defensive API Design:** Validating client payloads strictly on the network edge using Zod schemas before touching core database layers.

---

# Local Setup

## Clone the Repository
```bash
git clone [https://github.com/yashveersinghh/excerpt.git](https://github.com/yashveersinghh/excerpt.git)
cd excerpt
```

# Install Dependencies

## Frontend

```bash
cd Frontend
npm install
```

## Backend

```bash
cd Backend
npm install
```

---

# Environment Variables

## Frontend `.env`

```env
VITE_BACKEND_URL=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

## Backend `.env`

```env
DATABASE_URL=
JWT_SECRET=
```

---

# Run Locally

## Frontend

```bash
npm run dev
```

## Backend

```bash
npm run dev
```

---

# Deployment

## Frontend

Deployed on Vercel.

## Backend

Deployed using Cloudflare Workers.
