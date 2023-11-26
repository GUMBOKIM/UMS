import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    // TODO: Global 환경설정 추후 추가
    // ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRoot(databaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
