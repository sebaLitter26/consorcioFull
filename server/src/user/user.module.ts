import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserExistsValidator } from './validators/user-exists.validator';

@Module({
    providers: [UserResolver, UserService, UserExistsValidator]
})
export class UserModule {}
