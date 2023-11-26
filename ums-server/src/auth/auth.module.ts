import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../entity';

@Module({
  imports: [TypeOrmModule.forFeature(Entities)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
