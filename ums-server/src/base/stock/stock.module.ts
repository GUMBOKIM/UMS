import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { PartRepository, StockRepository } from '@entity/base';

@Module({
  imports: [StockRepository, PartRepository],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
