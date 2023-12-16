import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entity/base/member.entity';
import { Company } from '../entity/base/company.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Company])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
