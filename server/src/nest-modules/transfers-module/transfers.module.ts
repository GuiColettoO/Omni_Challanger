import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/user/infra/db/sequelize/user.model';
import { TransferModel } from 'src/core/transfer/infra/db/sequelize/transfer.model';
import { TransferSequelizeRepository } from 'src/core/transfer/infra/db/sequelize/transfer.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, TransferModel])],
  controllers: [TransfersController],
    providers: [
      {
        provide: TransferSequelizeRepository,
        useFactory: (transferModel: typeof TransferModel) =>
          new TransferSequelizeRepository(transferModel),
        inject: [getModelToken(UserModel)],
      },
    ],
})
export class TransfersModule {}
