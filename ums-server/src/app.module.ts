import { AuthModule } from '@auth/auth.module';
import { BaseModule } from '@base/base.module';
import LocalDataBaseConfig from '@config/database.local.config';
import { ForwardModule } from '@forward/forward.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiveModule } from '@receive/receive.module';

@Module({
  imports: [
    // TODO: Global 환경설정 추후 추가
    // ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRoot(LocalDataBaseConfig),
    AuthModule,
    BaseModule,
    ForwardModule,
    ReceiveModule,
  ],
})
export class AppModule {}
