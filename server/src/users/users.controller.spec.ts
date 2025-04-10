import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserSequelizeRepository } from 'src/core/user/infra/db/sequelize/user.repository';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserSequelizeRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  })
});
