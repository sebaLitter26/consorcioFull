# Docker Multicontainer Application Angular Nodejs Postgres Nginx Basic

In this codeching tutorial we are dockerizing an Angular application, Nginx proxy and NodeJs backend application
and use them in a docker compose to work together.


npm run build 
npm run prisma:apply


# Flags Server

## Description

This server is built in top of [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ yarn
```

npm i ts-morph

## Database setup

```bash
$ yarn prisma:apply
```


npx prisma db seed
npx prisma migrate dev

## Start Prisma Studio

```bash
$ yarn prisma studio
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

para crear modulos:
nest g resource terminal --no-spec       (GraphQL code first ,  yes  , yes)
