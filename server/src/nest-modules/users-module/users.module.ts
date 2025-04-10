import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/user/infra/db/sequelize/user.model';
import { TransferModel } from 'src/core/transfer/infra/db/sequelize/transfer.model';
import { USER_PROVIDERS } from './users.providers';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, TransferModel])],
  controllers: [UsersController],
  providers: [...Object.values(USER_PROVIDERS.REPOSITORIES), 
    ...Object.values(USER_PROVIDERS.USE_CASES), 
  ],
})
export class UsersModule {}
