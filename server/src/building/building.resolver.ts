import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BuildingService } from './building.service';
import { CreateBuildingDTO } from './dto/create-building.dto';
import { UpdateBuildingDTO } from './dto/update-building.dto';
import { Building } from './model/building';

@Resolver(() => Building)
export class BuildingResolver {
  constructor(private readonly buildingService: BuildingService) {}

  @Query(() => [Building])
  async buildings() {
    return await this.buildingService.getMany();
  }

  @Query(() => Building)
  async building(@Args('id') id: string) {
    return await this.buildingService.get(id);
  }

  @Mutation(() => Building)
  async createBuilding(
    @Args({ name: 'input', type: () => CreateBuildingDTO })
    data: CreateBuildingDTO,
  ) {
    return await this.buildingService.create(data);
  }

  @Mutation(() => Building)
  async updateBuilding(
    @Args({ name: 'input', type: () => UpdateBuildingDTO })
    data: UpdateBuildingDTO,
  ) {
    return await this.buildingService.update(data);
  }

  @Mutation(() => Building)
  async deleteBuilding(@Args('id') id: string) {
    return await this.buildingService.delete(id);
  }
}
