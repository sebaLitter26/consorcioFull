import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOwnerDTO } from './dto/create-owner.dto';
import { UpdateOwnerDTO } from './dto/update-owner.dto';
import { Owner } from './model/owner';
import { OwnerService } from './owner.service';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Query(() => [Owner])
  async owners() {
    return await this.ownerService.getMany();
  }

  @Query(() => Owner)
  async owner(@Args('id') id: string) {
    return await this.ownerService.get(id);
  }

  @Mutation(() => Owner)
  async createOwner(
    @Args({ name: 'input', type: () => CreateOwnerDTO })
    input: CreateOwnerDTO,
  ) {
    return await this.ownerService.create(input);
  }

  @Mutation(() => Owner)
  async updateOwner(
    @Args({ name: 'input', type: () => UpdateOwnerDTO })
    input: UpdateOwnerDTO,
  ) {
    return await this.ownerService.update(input);
  }

  @Mutation(() => Owner)
  async deleteOwner(@Args('id') id: string) {
    return await this.ownerService.delete(id);
  }
}
