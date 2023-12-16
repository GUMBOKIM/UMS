import { Company } from './base/company.entity';
import { Member } from './base/member.entity';
import { Part } from './base/part.entity';
import { Stock } from './base/stock.entity';
import { ForwardCategory } from './forward/forwardCategory.entity';
import { ForwardFactory } from './forward/forwardFactory.entity';
import { ForwardPart } from './forward/forwardPart.entity';
import { ForwardPlan } from './forward/forwardPlan.entity';
import { ReceiveCategory } from './receive/receiveCategory.entity';
import { ReceivePart } from './receive/receivePart.entity';
import { ReceivePlan } from './receive/receivePlan.entity';

const BaseEntities = [Company, Member, Part, Stock];
const ForwardEntities = [
  ForwardCategory,
  ForwardFactory,
  ForwardPart,
  ForwardPlan,
];
const ReceiveEntities = [ReceiveCategory, ReceivePart, ReceivePlan];

export const Entities = [
  ...BaseEntities,
  ...ForwardEntities,
  ...ReceiveEntities,
];
