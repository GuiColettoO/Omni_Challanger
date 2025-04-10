import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserSequelizeRepository } from 'src/core/user/infra/db/sequelize/user.repository';
import { DatabaseModule } from 'src/nest-modules/database-module/database.module';
import { UsersModule } from './users.module';
import { ConfigModule } from 'src/nest-modules/config-module/config.module';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule],
      controllers: [UsersController],
      providers: [UserSequelizeRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  })
});
