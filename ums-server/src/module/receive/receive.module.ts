import {
  ReceivePlanPartRepository,
  ReceivePlanRepository,
} from '@entity/receive';
import {
  ProviderCustomerCompanyMap,
  SupplierProviderCompanyMap,
} from '@entity/setting';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceivePlanPartService } from '@receive/receive-plan-part.service';
import { ReceivePlanService } from '@receive/receive-plan.service';
import { ReceiveController } from './receive.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReceivePlanRepository,
      ReceivePlanPartRepository,
      SupplierProviderCompanyMap,
      ProviderCustomerCompanyMap,
    ]),
  ],
  controllers: [ReceiveController],
  providers: [ReceivePlanService, ReceivePlanPartService],
})
export class ReceiveModule {}
