import {
  ProviderCustomerCompanyMap,
  SupplierProviderCompanyMap,
} from '@entity/setting';
import { Company, Member, Part, Stock } from './base';
import {
  ForwardCategory,
  ForwardFactory,
  ForwardPart,
  ForwardPlan,
} from './forward';
import { ReceiveCategory, ReceivePlan, ReceivePlanPart } from './receive';

const BaseEntities = [Company, Member, Part, Stock];

const ForwardEntities = [
  ForwardCategory,
  ForwardFactory,
  ForwardPart,
  ForwardPlan,
];

const ReceiveEntities = [ReceiveCategory, ReceivePlanPart, ReceivePlan];

const SettingEntities = [
  SupplierProviderCompanyMap,
  ProviderCustomerCompanyMap,
];

export const Entities = [
  ...BaseEntities,
  ...ForwardEntities,
  ...ReceiveEntities,
  ...SettingEntities,
];
