import { Injectable } from '@nestjs/common';
import { User } from './models/users.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create({
            ...createUserDto,
        })

        const result = this.userRepository.save(user);
        if (!result) {
            throw new Error('Failed to create user');
        }

        return user;
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<any | undefined> {
        return this.userRepository.findOneBy({id});
    }

    findOneByEmail(email: string): Promise<any | undefined> {
        return this.userRepository.findOneBy({email});
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
