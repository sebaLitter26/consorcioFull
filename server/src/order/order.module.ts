import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { ProductOnOrderEntity } from '../product-on-order/model/product-on-order';

@Module({
  //imports: [ProductOnOrderEntity],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
