import { Member } from './member';
import { Part } from './part';
import { Stock } from './stock';
import { Company } from './company';
import ForwardEntities from './forward';
import ReceiveEntities from './receive';

const Entities = [
  Company,
  Member,
  Part,
  Stock,
  ...ForwardEntities,
  ...ReceiveEntities,
];

export default Entities;
