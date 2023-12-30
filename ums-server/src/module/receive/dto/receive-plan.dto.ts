import { ReceiveCategory, ReceiveStatus } from '@entity/receive';

export class ReceivePlanDto {
  id: number;
  supplier: {
    id: number;
    name: string;
  };
  provider: {
    id: number;
    name: string;
  };
  date: Date;
  order: number;
  category: ReceiveCategory;
  carNumber?: string;
  memo?: string;
  receiveStatus: ReceiveStatus;
  createdAt: Date;
}
