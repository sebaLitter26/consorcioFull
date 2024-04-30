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


## OAuth2.0
https://sebalitter.auth0.com/api/v2/users/google-oauth2|101328564217916870964  {{user_id / sub}}

import { decode } from 'jsonwebtoken';

const jwtPayload = decode(yourJwtToken);