import { Module } from '@nestjs/common';
import { PartModule } from './part/part.module';
import { StockModule } from './stock/stock.module';
import { CompanyModule } from './company/company.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [PartModule, StockModule, CompanyModule, MemberModule],
})
export class BaseModule {}
