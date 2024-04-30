import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductOnOrderDTO } from './dto/create-product-on-order.dto';
import { UpdateProductOnOrderDTO } from './dto/update-product-on-order.dto';
import { ProductOnOrder } from './model/product-on-order';
import { ProductOnOrderService } from './product-on-order.service';
import { Roles, User as UserSchema } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => ProductOnOrder)
export class ProductOnOrderResolver {
  constructor(private readonly ProductOnOrderService: ProductOnOrderService) {}

  @Query(() => [ProductOnOrder])
  async ProductOnOrders() {
    return await this.ProductOnOrderService.getMany();
  }

  @Query(() => ProductOnOrder)
  async ProductOnOrder(@Args('id') id: string) {
    return await this.ProductOnOrderService.get(id);
  }

  @Mutation(() => ProductOnOrder)
  async createProductOnOrder(
    @CurrentUser([ ]) user: UserSchema,
    @Args({ name: 'input', type: () => CreateProductOnOrderDTO }) input: CreateProductOnOrderDTO,
  ) {
    return await this.ProductOnOrderService.create(input, user);
  }

  @Mutation(() => ProductOnOrder)
  async updateProductOnOrder(
    @Args({ name: 'input', type: () => UpdateProductOnOrderDTO })
    input: UpdateProductOnOrderDTO,
  ) {
    return await this.ProductOnOrderService.update(input);
  }

  @Mutation(() => ProductOnOrder)
  async deleteProductOnOrder(@Args('id') id: string) {
    return await this.ProductOnOrderService.delete(id);
  }
}
