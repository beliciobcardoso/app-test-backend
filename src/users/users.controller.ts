import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDomain } from './users.domain';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    async findAllUsers(@Res() response: Response) {
        const users = await this.usersService.findAllUsers()
        return response.status(200).json(users);
    }

    @Get(':id')
    async findUserById(@Res() response: Response, @Param('id') id: string) {
        const user = await this.usersService.findUserById(id);       
        return response.status(200).json(user);
    }

    @Post()
    async createUser(@Res() response: Response, @Body() user: UserDomain) {
        const newUser = await this.usersService.createUser(user)
        return response.status(201).json(newUser);
    }
}
