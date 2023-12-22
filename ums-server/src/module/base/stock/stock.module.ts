import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { PartRepository, StockRepository } from '@entity/base';

@Module({
  imports: [TypeOrmModule.forFeature([PartRepository, StockRepository])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
