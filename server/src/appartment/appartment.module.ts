import { Module } from '@nestjs/common';
import { AppartmentService } from './appartment.service';
import { AppartmentResolver } from './appartment.resolver';

@Module({
  providers: [AppartmentService, AppartmentResolver],
})
export class AppartmentModule {}
