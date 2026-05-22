```txt
npm install
npm run dev
```

### Database migrations (required after pulling schema changes)

Prisma Accelerate cannot run migrations. Copy `.env.example` to `.env`, set `DIRECT_DATABASE_URL` to your **direct** Postgres connection string (from the Prisma Data Platform or your DB host), then:

```txt
npx prisma migrate deploy
npm run deploy
```

If create post returns 500, the production DB is likely missing `summary`, `publishedAt`, and `imageUrl` on the `Post` table — run the command above.

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
