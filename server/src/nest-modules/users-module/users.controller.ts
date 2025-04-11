import { Controller, Get, Post, Body, Param, Inject, UseGuards } from '@nestjs/common';
import { CreateUserInput, CreateUserUseCase } from 'src/core/user/application/create/create-user.use-case';
import { GetAllUserUseCase } from 'src/core/user/application/get-all/get-all-user.use-case';
import { LoginInput, LoginUseCase } from 'src/core/user/application/login/login.use-case';
import { JwtAuthGuard } from '../jwt-module/jwt-auth.guard';

@Controller('users')
export class UsersController {

  @Inject(CreateUserUseCase)
  private createUserUseCase: CreateUserUseCase;

  @Inject(GetAllUserUseCase)
  private getAllUserUseCase: GetAllUserUseCase;

  @Inject(LoginUseCase)
  private loginUseCase: LoginUseCase;

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserInput) {
    return await this.createUserUseCase.execute(createUserDto);
  }

  @Post('/signin')
  async login(@Body() loginDto: LoginInput) {
    return await this.loginUseCase.execute(loginDto);
    
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.getAllUserUseCase.execute();
  }

}
