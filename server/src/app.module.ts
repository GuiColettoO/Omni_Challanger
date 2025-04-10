import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransfersModule } from './transfers/transfers.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './core/user/infra/db/sequelize/user.model';
import { TransferModel } from './core/transfer/infra/db/sequelize/transfer.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory',
      logging: false,
      models: [UserModel, TransferModel]
    }),

    UsersModule, TransfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
