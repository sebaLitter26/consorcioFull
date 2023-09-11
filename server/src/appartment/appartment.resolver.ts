import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAppartmentDTO } from './dto/create-appartment.dto';
import { UpdateAppartmentDTO } from './dto/update-appartment.dto';
import { Appartment } from './model/appartment';
import { AppartmentService } from './appartment.service';

@Resolver(() => Appartment)
export class AppartmentResolver {
  constructor(private readonly appartmentService: AppartmentService) {}

  @Query(() => [Appartment])
  async appartments() {
    return await this.appartmentService.getMany();
  }

  @Query(() => Appartment)
  async appartment(@Args('id') id: string) {
    return await this.appartmentService.get(id);
  }

  @Mutation(() => Appartment)
  async createAppartment(
    @Args({ name: 'input', type: () => CreateAppartmentDTO })
    input: CreateAppartmentDTO,
  ) {
    return await this.appartmentService.create(input);
  }

  @Mutation(() => Appartment)
  async updateAppartment(
    @Args({ name: 'input', type: () => UpdateAppartmentDTO })
    input: UpdateAppartmentDTO,
  ) {
    return await this.appartmentService.update(input);
  }

  @Mutation(() => Appartment)
  async deleteAppartment(@Args('id') id: string) {
    return await this.appartmentService.delete(id);
  }
}
