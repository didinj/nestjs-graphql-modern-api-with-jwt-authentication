import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => Int)
    id: number;

    @Field({ nullable: true })
    @IsOptional()
    @Length(3, 50)
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;
}