import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UsersListDto } from './dto/users-list-dto/users-list-dto';
import { UsersCreateDto } from './dto/users-create-dto/users-create-dto';
import { UserDomain } from './users.domain';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) { }

    async findAllUsers(): Promise<UsersListDto[]> {
        const users = await this.usersRepository.find();
        if (users.length === 0) throw new HttpException('No users found', HttpStatus.NOT_FOUND);
        return users
    }

    async findUserById(id: string): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return {
            ...user,
            password: undefined,
        }
    }

    async createUser(user: UserDomain): Promise<UserDomain> {
        const userExists = await this.usersRepository.findOneBy({ email: user.email });
        if (userExists) throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
        
        const newUser = await this.usersRepository.save(user);
        
        return {
            ...newUser,
            password: undefined
        }
       
    }
}
