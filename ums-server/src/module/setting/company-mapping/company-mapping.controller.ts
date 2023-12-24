import { AllowedCompany } from '@auth/auth.decorator';
import { LoginMember } from '@auth/session/dto';
import { Login } from '@auth/session/session.decorator';
import { SessionGuard } from '@auth/session/session.guard';
import { CompanyType } from '@entity/base';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyMappingService } from 'src/module/setting/company-mapping/company-mapping.service';
import {
  ProviderCustomerMapReqDto,
  ProviderCustomerMapResDto,
  SupplierProviderMapReqDto,
  SupplierProviderMapResDto,
} from './dto';

@UseGuards(SessionGuard)
@Controller('company-mapping')
export class CompanyMappingController {
  constructor(private readonly companyMappingService: CompanyMappingService) {}

  @Get('supplier-provider-map')
  async findSupplierProviderMap(
    @Login() loginMember: LoginMember,
    @Query('providerId') providerId: number,
  ): Promise<SupplierProviderMapResDto[]> {
    return await this.companyMappingService.findSupplierProviderMap(
      providerId,
      loginMember,
    );
  }

  @Post('supplier-provider-map')
  @AllowedCompany(CompanyType.PROVIDER)
  async createSupplierProviderMap(
    @Login() loginMember: LoginMember,
    @Body() supplierProviderMapReqDto: SupplierProviderMapReqDto,
  ): Promise<SupplierProviderMapResDto> {
    return await this.companyMappingService.createSupplierProviderMap(
      supplierProviderMapReqDto,
      loginMember,
    );
  }

  @Delete('supplier-provider-map')
  @AllowedCompany(CompanyType.PROVIDER)
  async deleteSupplierProviderMap(
    @Login() loginMember: LoginMember,
    @Body() supplierProviderMapReqDto: SupplierProviderMapReqDto,
  ) {
    await this.companyMappingService.deleteSupplierProviderMap(
      supplierProviderMapReqDto,
      loginMember,
    );
    return 'delete complete';
  }

  @Get('provider-customer-map')
  @AllowedCompany(CompanyType.PROVIDER, CompanyType.CUSTOMER)
  async findProviderCustomerMap(
    @Login() loginMember: LoginMember,
  ): Promise<ProviderCustomerMapResDto[]> {
    return await this.companyMappingService.findProviderCustomerMap(
      loginMember,
    );
  }

  @Post('provider-customer-map')
  @AllowedCompany(CompanyType.PROVIDER)
  async createProviderCustomerMap(
    @Login() loginMember: LoginMember,
    @Body() providerCustomerMapReqDto: ProviderCustomerMapReqDto,
  ): Promise<ProviderCustomerMapResDto> {
    return await this.companyMappingService.createProviderCustomerMap(
      loginMember,
      providerCustomerMapReqDto,
    );
  }

  @Delete('provider-customer-map')
  @AllowedCompany(CompanyType.PROVIDER)
  async deleteProviderCustomerMap(
    @Login() loginMember: LoginMember,
    @Body() providerCustomerMapReqDto: ProviderCustomerMapReqDto,
  ) {
    await this.companyMappingService.deleteProviderCustomerMap(
      providerCustomerMapReqDto,
      loginMember,
    );

    return 'delete complete';
  }
}
