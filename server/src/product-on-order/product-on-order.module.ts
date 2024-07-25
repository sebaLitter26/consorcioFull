import { Module } from '@nestjs/common';
import { ProductOnOrderService } from './product-on-order.service';
import { ProductOnOrderResolver } from './product-on-order.resolver';
//import { OrderEntity } from '../order/model/order';

@Module({
  //imports:[OrderEntity],
  providers: [ProductOnOrderService, ProductOnOrderResolver],
})
export class ProductOnOrderModule {}
