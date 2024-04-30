import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductDTO } from './dto/create-product.dto';
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
