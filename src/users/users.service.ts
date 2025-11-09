import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserInput: CreateUserInput): Promise<User> {
        const existing = await this.usersRepository.findOneBy({ email: createUserInput.email });
        if (existing) {
            throw new BadRequestException('Email is already registered.');
        }

        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        const user = this.usersRepository.create({
            ...createUserInput,
            password: hashedPassword,
        });

        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return user;
    }

    async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, updateUserInput);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<User> {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
        return user;
    }

    findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }
}
