import { LoginMember } from '@auth/session/dto';
import { Company, CompanyType } from '@entity/base';
import {
  ProviderCustomerCompanyMap,
  SupplierProviderCompanyMap,
} from '@entity/setting';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import {
  ProviderCustomerMapReqDto,
  ProviderCustomerMapResDto,
  SupplierProviderMapReqDto,
  SupplierProviderMapResDto,
} from 'src/module/setting/company-mapping/dto';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyMappingService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(SupplierProviderCompanyMap)
    private readonly spcRepository: Repository<SupplierProviderCompanyMap>,
    @InjectRepository(ProviderCustomerCompanyMap)
    private readonly pccRepository: Repository<ProviderCustomerCompanyMap>,
  ) {}

  async findSupplierProviderMap(providerId: number, loginMember: LoginMember) {
    const loginCompany = loginMember.company;

    switch (loginCompany.type) {
      case CompanyType.SUPPLIER:
        const supplierSPCMapList = await this.spcRepository.findBy({
          supplier: { id: loginCompany.id },
        });
        return _.map(supplierSPCMapList, this.mapSPCMapToSPCRes);
      case CompanyType.PROVIDER:
        const providerSPCMapList = await this.spcRepository.findBy({
          provider: { id: loginCompany.id },
        });
        return _.map(providerSPCMapList, this.mapSPCMapToSPCRes);
      case CompanyType.CUSTOMER:
        const findPCCMapList = await this.pccRepository.findBy({
          customer: { id: loginCompany.id },
        });
        const hasCustomerProvider = _.find(findPCCMapList, (pccMap) =>
          _.isEqual(pccMap.provider.id, providerId),
        );
        if (hasCustomerProvider) {
          throw new ForbiddenException('올바르지 않은 3PL ID 입니다.');
        }
        const customerSPCMapList = await this.spcRepository.findBy({
          provider: { id: providerId },
        });
        return _.map(customerSPCMapList, this.mapSPCMapToSPCRes);
    }
  }

  async createSupplierProviderMap(
    supplierProviderMapReqDto: SupplierProviderMapReqDto,
    loginMember: LoginMember,
  ) {
    const loginCompany = loginMember.company;
    const { supplierId, providerId } = supplierProviderMapReqDto;

    if (!_.isEqual(loginCompany.id, providerId)) {
      throw new ForbiddenException('올바르지 않은 3PL ID 입니다.');
    }

    const supplier = await this.companyRepository.findOneBy({
      id: supplierId,
    });

    const provider = await this.companyRepository.findOneBy({
      id: providerId,
    });

    if (!_.isEqual(supplier.type, CompanyType.SUPPLIER)) {
      throw new BadRequestException('올바르지 않은 공급자 ID 입니다.');
    }

    const existSPCMap = await this.spcRepository.findOneBy({
      supplier: {
        id: supplierId,
      },
      provider: {
        id: providerId,
      },
    });

    if (!_.isNil(existSPCMap)) {
      throw new BadRequestException('이미 존재하는 공급자 ID 입니다.');
    }

    const spcMap = new SupplierProviderCompanyMap();
    spcMap.supplier = supplier;
    spcMap.provider = provider;

    await this.spcRepository.save(spcMap);

    return this.mapSPCMapToSPCRes(spcMap);
  }

  async deleteSupplierProviderMap(
    supplierProviderMapReqDto: SupplierProviderMapReqDto,
    loginMember: LoginMember,
  ) {
    const loginCompany = loginMember.company;
    const { supplierId, providerId } = supplierProviderMapReqDto;

    if (!_.isEqual(loginCompany.id, providerId)) {
      throw new ForbiddenException('올바르지 않은 3PL ID 입니다.');
    }

    const existSPCMap = await this.spcRepository.findOneBy({
      supplier: {
        id: supplierId,
      },
      provider: {
        id: providerId,
      },
    });

    if (_.isNil(existSPCMap)) {
      throw new BadRequestException('존재하지 않는 공급자 ID 입니다.');
    }

    await this.spcRepository.delete({
      id: existSPCMap.id,
    });
  }

  async findProviderCustomerMap(loginMember: LoginMember) {
    const loginCompany = loginMember.company;

    switch (loginCompany.type) {
      case CompanyType.PROVIDER:
        const providerPCCMapList = await this.pccRepository.findBy({
          provider: { id: loginCompany.id },
        });
        return _.map(providerPCCMapList, this.mapPCCMapToPCCRes);
      case CompanyType.CUSTOMER:
        const customerPCCMapList = await this.pccRepository.findBy({
          customer: { id: loginCompany.id },
        });
        return _.map(customerPCCMapList, this.mapPCCMapToPCCRes);
    }
  }

  async createProviderCustomerMap(
    loginMember: LoginMember,
    providerCustomerMapReqDto: ProviderCustomerMapReqDto,
  ) {
    const loginCompany = loginMember.company;
    const { providerId, customerId } = providerCustomerMapReqDto;

    if (!_.isEqual(loginCompany.id, providerId)) {
      throw new ForbiddenException('올바르지 않은 3PL ID 입니다.');
    }

    const customer = await this.companyRepository.findOneBy({
      id: customerId,
    });

    const provider = await this.companyRepository.findOneBy({
      id: providerId,
    });

    if (!_.isEqual(customer.type, CompanyType.CUSTOMER)) {
      throw new BadRequestException('올바르지 않은 고객사 ID 입니다.');
    }

    const existPCCMap = await this.pccRepository.findOneBy({
      provider: { id: providerId },
      customer: { id: customerId },
    });

    if (!_.isNil(existPCCMap)) {
      throw new BadRequestException('이미 존재하는 고객사 ID 입니다.');
    }

    const pccMap = new ProviderCustomerCompanyMap();
    pccMap.provider = provider;
    pccMap.customer = customer;

    await this.pccRepository.save(pccMap);

    return this.mapPCCMapToPCCRes(pccMap);
  }

  async deleteProviderCustomerMap(
    providerCustomerMapReqDto: ProviderCustomerMapReqDto,
    loginMember: LoginMember,
  ) {
    const loginCompany = loginMember.company;
    const { providerId, customerId } = providerCustomerMapReqDto;

    if (!_.isEqual(loginCompany.id, providerId)) {
      throw new ForbiddenException('올바르지 않은 3PL ID 입니다.');
    }

    const existPCCMap = await this.pccRepository.findOneBy({
      provider: { id: providerId },
      customer: { id: customerId },
    });

    if (_.isNil(existPCCMap)) {
      throw new BadRequestException('존재하지 않는 고객사 ID 입니다.');
    }

    await this.pccRepository.delete({
      id: existPCCMap.id,
    });
  }

  private mapSPCMapToSPCRes(spcMap: SupplierProviderCompanyMap) {
    const { id, supplier, provider } = spcMap;
    const res = new SupplierProviderMapResDto();
    res.id = id;
    res.supplier = {
      id: supplier.id,
      name: supplier.name,
    };
    res.provider = {
      id: provider.id,
      name: provider.name,
    };
    return res;
  }

  private mapPCCMapToPCCRes(spcMap: ProviderCustomerCompanyMap) {
    const { id, provider, customer } = spcMap;
    const res = new ProviderCustomerMapResDto();
    res.id = id;
    res.customer = {
      id: customer.id,
      name: customer.name,
    };
    res.provider = {
      id: provider.id,
      name: provider.name,
    };
    return res;
  }
}
