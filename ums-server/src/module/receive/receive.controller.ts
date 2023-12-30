import { AllowedCompany } from '@auth/auth.decorator';
import { LoginMember } from '@auth/session/dto';
import { Login } from '@auth/session/session.decorator';
import { SessionGuard } from '@auth/session/session.guard';
import { CompanyType } from '@entity/base';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateReceivePlanDto,
  CreateReceivePlanPartDto,
  FindReceivePlanQuery,
  UpdateReceivePlanDto,
  UpdateReceivePlanPartDto,
} from '@receive/dto';
import { ReceivePlanPartService } from '@receive/receive-plan-part.service';
import { ReceivePlanService } from '@receive/receive-plan.service';

@UseGuards(SessionGuard)
@AllowedCompany(CompanyType.SUPPLIER, CompanyType.PROVIDER)
@Controller('receive')
export class ReceiveController {
  constructor(
    private readonly receivePlanService: ReceivePlanService,
    private readonly receivePlanPartService: ReceivePlanPartService,
  ) {}

  @Get()
  async getReceivePlans(
    @Login() loginMember: LoginMember,
    @Query() findReceivePlanQuery: FindReceivePlanQuery,
  ) {
    await this.receivePlanService.findReceivePlanByCompanyId(
      findReceivePlanQuery,
      loginMember,
    );
    return 'findAll';
  }

  @Get(':receivePlanId')
  async getReceivePlan(
    @Login() loginMember: LoginMember,
    @Param('receivePlanId') receivePlanId: number,
  ) {
    await this.receivePlanService.findReceivePlan(receivePlanId, loginMember);
    return 'find';
  }

  @Post()
  async createReceivePlan(
    @Login() loginMember: LoginMember,
    @Body() createReceivePlanDto: CreateReceivePlanDto,
  ) {
    await this.receivePlanService.createReceivePlan(
      createReceivePlanDto,
      loginMember,
    );
    return 'create plan';
  }

  @Put(':receivePlanId')
  async updateReceivePlan(
    @Login() loginMember: LoginMember,
    @Param('receivePlanId') receivePlanId: number,
    @Body() updateReceivePlanDto: UpdateReceivePlanDto,
  ) {
    await this.receivePlanService.updateReceivePlan(
      receivePlanId,
      updateReceivePlanDto,
      loginMember,
    );
    return 'update';
  }

  @Put(':receivePlanId/:status')
  async updateReceivePlanStatus(
    @Login() loginMember: LoginMember,
    @Param('receivePlanId') receivePlanId: number,
  ) {
    await this.receivePlanService.updateStatus(loginMember, receivePlanId);
  }

  @Post('parts/:receivePlanId')
  createReceivePlanParts(
    @Login() loginMember: LoginMember,
    @Param('receivePlanId') receivePlanId: number,
    @Body() createReceivePlanPartDto: CreateReceivePlanPartDto,
  ) {
    this.receivePlanPartService.createReceiveParts(
      receivePlanId,
      createReceivePlanPartDto,
      loginMember,
    );
  }

  @Put('part/:receivePlanId')
  updateReceivePlanPart(
    @Login() loginMember: LoginMember,
    @Param('receivePlanId') receivePlanId: number,
    @Body() updateReceivePlanPartDto: UpdateReceivePlanPartDto,
  ) {
    this.receivePlanPartService.updateReceivePlanPart(
      receivePlanId,
      updateReceivePlanPartDto,
      loginMember,
    );
    return 'update part';
  }
}
