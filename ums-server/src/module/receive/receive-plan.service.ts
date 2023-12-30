import { LoginMember } from '@auth/session/dto';
import { CompanyType } from '@entity/base';
import {
  ReceivePlanPartRepository,
  ReceivePlanRepository,
} from '@entity/receive';
import {
  ProviderCustomerCompanyMap,
  SupplierProviderCompanyMap,
} from '@entity/setting';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateReceivePlanDto,
  FindReceivePlanQuery,
  UpdateReceivePlanDto,
} from '@receive/dto';
import _ from 'lodash';
import { Between, In, Repository } from 'typeorm';

@Injectable()
export class ReceivePlanService {
  constructor(
    private readonly receivePlanRepository: ReceivePlanRepository,
    private readonly receivePlanPartRepository: ReceivePlanPartRepository,
    @InjectRepository(SupplierProviderCompanyMap)
    private readonly spcRepository: Repository<SupplierProviderCompanyMap>,
    @InjectRepository(ProviderCustomerCompanyMap)
    private readonly pccRepository: Repository<ProviderCustomerCompanyMap>,
  ) {}

  async findReceivePlanByCompanyId(
    findReceivePlanQuery: FindReceivePlanQuery,
    loginMember: LoginMember,
  ) {
    const { companyIds, startedAt, endedAt } = findReceivePlanQuery;

    const loginCompany = loginMember.company;
    switch (loginCompany.type) {
      case CompanyType.SUPPLIER:
        const hasOneCompanyId = companyIds.length === 1;
        if (hasOneCompanyId && !_.isEqual(companyIds[0], loginCompany.id)) {
          throw new BadRequestException('올바르지 않은 공급자 ID 입니다.');
        }
        break;
      case CompanyType.PROVIDER:
        const providerSPCMapList = await this.spcRepository.findBy({
          provider: { id: loginCompany.id },
        });
        const intersectProviderCompanyIds = _.chain(providerSPCMapList)
          .map((spcMap) => spcMap.supplier.id)
          .intersection(companyIds)
          .value();
        if (!_.isEqual(companyIds, intersectProviderCompanyIds)) {
          throw new BadRequestException('올바르지 않은 공급자 ID 입니다.');
        }
        break;
      case CompanyType.CUSTOMER:
        const pccMapList = await this.pccRepository.findBy({
          customer: { id: loginCompany.id },
        });
        const customerSPCMapList = await this.spcRepository.findBy({
          provider: In(_.map(pccMapList, (pccMap) => pccMap.provider.id)),
        });

        const intersectCustomerCompanyIds = _.chain(customerSPCMapList)
          .map((spcMap) => spcMap.supplier.id)
          .intersection(companyIds)
          .value();
        if (!_.isEqual(companyIds, intersectCustomerCompanyIds)) {
          throw new BadRequestException('올바르지 않은 공급자 ID 입니다.');
        }
        break;
    }

    const receivePlanList = await this.receivePlanRepository.findBy({
      supplier: {
        id: In(companyIds),
      },
      date: Between(startedAt, endedAt),
    });

    return;
  }

  findReceivePlan(receivePlanId: number, loginMember: LoginMember) {}

  createReceivePlan(
    createReceivePlanDto: CreateReceivePlanDto,
    loginMember: LoginMember,
  ) {}

  updateReceivePlan(
    receivePlanId: number,
    updateReceivePlanDto: UpdateReceivePlanDto,
    loginMember: LoginMember,
  ) {}

  updateStatus(loginMember: LoginMember, receivePlanId: number) {}
}
