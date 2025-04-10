import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/user/infra/db/sequelize/user.model';
import { TransferModel } from 'src/core/transfer/infra/db/sequelize/transfer.model';
import { UserSequelizeRepository } from 'src/core/user/infra/db/sequelize/user.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, TransferModel])],
  controllers: [UsersController],
  providers: [
    {
      provide: UserSequelizeRepository,
      useFactory: (userModel: typeof UserModel) =>
        new UserSequelizeRepository(userModel),
      inject: [getModelToken(UserModel)],
    },
  ],
})
export class UsersModule {}
