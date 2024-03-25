## Getting Started

Make sure you have the following installed:

- Node.js
- pnpm

```
pnpm install
```

Seed DB

```
npx prisma db seed
```

Generate Prisma Client

```
npx prisma generate
```

Start the server

```
pnpm dev
```

## Migrations

Run if you change the schema.prisma file

```
npx prisma migrate dev --name <migration_name>
```
