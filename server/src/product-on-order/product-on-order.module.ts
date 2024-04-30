import { Module } from '@nestjs/common';
import { ProductOnOrderService } from './product-on-order.service';
import { ProductOnOrderResolver } from './product-on-order.resolver';

@Module({
  providers: [ProductOnOrderService, ProductOnOrderResolver],
})
export class ProductOnOrderModule {}
