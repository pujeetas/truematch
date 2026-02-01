# TrueMatch Setup Notes

## Start server

npm run dev

## Prisma commands

npx prisma generate 
npx prisma migrate dev --name <name>
npx prisma studio

## Key files

- schema.prisma - Database structure
- src/graphql/schema.ts - GraphQL types
- src/graphql/resolvers.ts - Business logic

## Prisma 7 setup

- Need pg adapter
- Need prisma.config.ts
- Remove url from schema.prisma
