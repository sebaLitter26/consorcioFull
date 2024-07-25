import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/shared/args/pagination.args';
import { CreateProductDTO } from './dto/create-product.dto';
import { OrderProductDTO } from './dto/order-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './model/product';
import { ProductService } from './product.service';



@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async products() {
    return await this.productService.getMany();
  }

 /*  @Query(() => [Product])
  async searchProducts(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => OrderProductDTO,
      nullable: true,
    })
    orderBy: OrderProductDTO
  ) {
    return await this.productService.searchProducts(query, { after, before, first, last }, orderBy);
  } */

  @Query(() => Product)
  async product(@Args('id') id: string) {
    return await this.productService.get(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'input', type: () => CreateProductDTO })
    input: CreateProductDTO,
  ) {
    return await this.productService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args({ name: 'input', type: () => UpdateProductDTO })
    input: UpdateProductDTO,
  ) {
    return await this.productService.update(input);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string) {
    return await this.productService.delete(id);
  }
}
