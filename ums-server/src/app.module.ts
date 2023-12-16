import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    // TODO: Global 환경설정 추후 추가
    // ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    BaseModule,
  ],
})
export class AppModule {}
