import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSequelizeRepository } from 'src/core/user/infra/db/sequelize/user.repository';

@Controller('users')
export class UsersController {
  constructor(private userRepo: UserSequelizeRepository) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
