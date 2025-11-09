import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @Length(3, 50)
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    password: string;
}