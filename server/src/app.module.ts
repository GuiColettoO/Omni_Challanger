import { Module } from '@nestjs/common';
import { UsersModule } from './nest-modules/users-module/users.module';
import { TransfersModule } from './nest-modules/transfers-module/transfers.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { AuthModule } from './nest-modules/jwt-module/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    TransfersModule,
  ],
})
export class AppModule {}
