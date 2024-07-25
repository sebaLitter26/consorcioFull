import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { Order } from './model/order';
import { OrderService } from './order.service';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly OrderService: OrderService) {}

  @Query(() => [Order])
  async Orders() {
    return await this.OrderService.getMany();
  }

  @Query(() => Order)
  async Order(@Args('id') id: string) {
    return await this.OrderService.get(id);
  }

  @Mutation(() => Order)
  async createOrder(
    @CurrentUser([ ]) user: User,
    @Args({ name: 'input', type: () => CreateOrderDTO }) input: CreateOrderDTO,
  ) {
    return await this.OrderService.create(input, user);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args({ name: 'input', type: () => UpdateOrderDTO })
    input: UpdateOrderDTO,
  ) {
    return await this.OrderService.update(input);
  }

  @Mutation(() => Order)
  async deleteOrder(@Args('id') id: string) {
    return await this.OrderService.delete(id);
  }
}
