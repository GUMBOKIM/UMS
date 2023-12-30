import { LoginMember } from '@auth/session/dto';
import {
  ReceivePlanPartRepository,
  ReceivePlanRepository,
} from '@entity/receive';
import { Injectable } from '@nestjs/common';
import {
  CreateReceivePlanPartDto,
  UpdateReceivePlanPartDto,
} from '@receive/dto';

@Injectable()
export class ReceivePlanPartService {
  constructor(
    private readonly receivePlanRepository: ReceivePlanRepository,
    private readonly receivePlanPartRepository: ReceivePlanPartRepository,
  ) {}

  createReceiveParts(
    receivePlanId: number,
    createReceivePlanPartDto: CreateReceivePlanPartDto,
    loginMember: LoginMember,
  ) {}

  updateReceivePlanPart(
    receivePlanId: number,
    updateReceivePlanPartDto: UpdateReceivePlanPartDto,
    loginMember: LoginMember,
  ) {}
}
