import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/user/infra/db/sequelize/user.model';
import { TransferModel } from 'src/core/transfer/infra/db/sequelize/transfer.model';
import { TRANSFER_PROVIDERS } from './transfer.providers';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, TransferModel])],
  controllers: [TransfersController],
  providers: [
    ...Object.values(TRANSFER_PROVIDERS.REPOSITORIES),
    ...Object.values(TRANSFER_PROVIDERS.USE_CASES),
  ],
})
export class TransfersModule {}
