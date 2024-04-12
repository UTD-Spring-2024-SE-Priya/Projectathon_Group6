## Getting Started

Make sure you have the following installed:

- Node.js
- pnpm

Install dependencies

```
pnpm install
```

Install Dotenv

```
pnpm install dotenv --save
```

Create + Seed DB

```
cd prisma && touch dev.db
npx prisma db seed
```

Generate Prisma Client (for interacting with the database)

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
