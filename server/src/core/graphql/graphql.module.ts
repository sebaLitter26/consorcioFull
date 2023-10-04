import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
        driver: ApolloDriver,
        introspection: true,
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/core/graphql/api-schema.gql'),
        cors: {
          credentials: true,
          origin: true,
      },
    }),
  ],
})
export class GraphqlModule {}
