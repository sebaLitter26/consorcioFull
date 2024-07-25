import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductOnOrderDTO } from './dto/create-product-on-order.dto';
import { UpdateProductOnOrderDTO } from './dto/update-product-on-order.dto';
import { ProductOnOrderEntity } from './model/product-on-order';
import { ProductOnOrderService } from './product-on-order.service';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => ProductOnOrderEntity)
export class ProductOnOrderResolver {
  constructor(private readonly ProductOnOrderService: ProductOnOrderService) {}

  @Query(() => [ProductOnOrderEntity])
  async ProductOnOrders() {
    return await this.ProductOnOrderService.getMany();
  }

  @Query(() => ProductOnOrderEntity)
  async ProductOnOrder(@Args('id') id: string) {
    return await this.ProductOnOrderService.get(id);
  }

  @Mutation(() => ProductOnOrderEntity)
  async createProductOnOrder(
    @CurrentUser([ ]) user: User,
    @Args({ name: 'input', type: () => CreateProductOnOrderDTO }) input: CreateProductOnOrderDTO,
  ) {
    return await this.ProductOnOrderService.create(input, user);
  }

  @Mutation(() => ProductOnOrderEntity)
  async updateProductOnOrder(
    @Args({ name: 'input', type: () => UpdateProductOnOrderDTO })
    input: UpdateProductOnOrderDTO,
  ) {
    return await this.ProductOnOrderService.update(input);
  }

  @Mutation(() => ProductOnOrderEntity)
  async deleteProductOnOrder(@Args('id') id: string) {
    return await this.ProductOnOrderService.delete(id);
  }
}
