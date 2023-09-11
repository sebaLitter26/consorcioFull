import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../../core/prisma/prisma.service';

/**
 * Custom validator, checks for name/email unique.
 * Make sure that all your dependencies are not SCOPE.Default'ed.
 */
@ValidatorConstraint({ name: 'user', async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
    constructor(private readonly data: PrismaService) {}

    /**
     * Method should return true, if name is not taken.
     */
    async validate(name: string, args: ValidationArguments) {
        const result = await this.data.user.findFirst({
            where: { name },
            select: { id: true },
        });
        return !result;
    }

    defaultMessage(_args: ValidationArguments) {
        return 'User with $property $value already exists';
    }
}
