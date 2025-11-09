import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(() => [User], { name: 'users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Query(() => User, { name: 'user' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput);
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.usersService.update(updateUserInput.id, updateUserInput);
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    removeUser(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.remove(id);
    }
}
