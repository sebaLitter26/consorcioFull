import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './prisma/prisma.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [GraphqlModule, PrismaModule, WhatsappModule],
})
export class CoreModule {}
