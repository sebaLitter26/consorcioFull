import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles, User as UserSchema } from '@prisma/client';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async users(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([Roles.admin, Roles.superUser ]) user: User
  ) {

    return this.userService.findAll( validRoles.roles );
  }

  @Query(() => User, { name: 'user' })
  async user( 
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser([Roles.admin, Roles.superUser ]) user: User
  ): Promise<UserSchema | null> {
    
    return this.userService.findOneById(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([Roles.admin ]) user: UserSchema
  ): Promise<UserSchema> {
    return this.userService.update(updateUserInput.id, updateUserInput, user );
  }

  @Mutation(() => User, { name: 'blockUser' })
  async blockUser( 
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser([ Roles.admin ]) user: UserSchema
  ): Promise<UserSchema | undefined> {
    return await this.userService.block(id, user );
  }

  /* @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  } */
}
