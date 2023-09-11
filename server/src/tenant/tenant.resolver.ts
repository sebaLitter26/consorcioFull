import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTenantDTO } from './dto/create-tenant.dto';
import { UpdateTenantDTO } from './dto/update-tenant.dto';
import { Tenant } from './model/tenant';
import { TenantService } from './tenant.service';

@Resolver(() => Tenant)
export class TenantResolver {
  constructor(private readonly tenantService: TenantService) {}

  @Query(() => [Tenant])
  async tenants() {
    return await this.tenantService.getMany();
  }

  @Query(() => Tenant)
  async tenant(@Args('id') id: string) {
    return await this.tenantService.get(id);
  }

  @Mutation(() => Tenant)
  async createTenant(
    @Args({ name: 'input', type: () => CreateTenantDTO })
    input: CreateTenantDTO,
  ) {
    return await this.tenantService.create(input);
  }

  @Mutation(() => Tenant)
  async updateTenant(
    @Args({ name: 'input', type: () => UpdateTenantDTO })
    input: UpdateTenantDTO,
  ) {
    return await this.tenantService.update(input);
  }

  @Mutation(() => Tenant)
  async deleteTenant(@Args('id') id: string) {
    return await this.tenantService.delete(id);
  }
}
