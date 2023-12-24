import { Company } from '@entity/base';
import {
  ProviderCustomerCompanyMap,
  SupplierProviderCompanyMap,
} from '@entity/setting';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyMappingController } from 'src/module/setting/company-mapping/company-mapping.controller';
import { CompanyMappingService } from 'src/module/setting/company-mapping/company-mapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      SupplierProviderCompanyMap,
      ProviderCustomerCompanyMap,
    ]),
  ],
  controllers: [CompanyMappingController],
  providers: [CompanyMappingService],
})
export class CompanyMappingModule {}
