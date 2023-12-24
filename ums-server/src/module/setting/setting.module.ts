import { Module } from '@nestjs/common';
import { CompanyMappingModule } from 'src/module/setting/company-mapping/company-mapping.module';

@Module({
  imports: [CompanyMappingModule],
})
export class SettingModule {}
