import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInRequest, SignUpRequest } from './auth.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Member, MemberStatus } from '../entity/member';
import { Repository } from 'typeorm';
import { Company } from '../entity/company';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private jwtService: JwtService,
  ) {}

  async signUp(request: SignUpRequest) {
    const existMember = await this.memberRepository.findOneBy({
      account: request.account,
    });

    if (!_.isEmpty(existMember)) {
      throw new BadRequestException('동일한 아이디의 계정이 존재합니다.');
    }

    const company = await this.companyRepository.findOneBy({
      id: request.companyId,
    });

    if (_.isEmpty(company)) {
      throw new BadRequestException('올바른 회사 코드가 아닙니다.');
    }

    const hashedPassword = await this.hash(request.password);

    const member = new Member();
    member.account = request.account;
    member.password = hashedPassword;
    member.email = request.email;
    member.phone = request.phone;
    member.memo = request.memo;
    member.company = company;
    member.status = MemberStatus.NOT_APPROVED;

    await this.memberRepository.save(member);
  }

  async signIn(request: SignInRequest) {
    const member = await this.memberRepository.findOneBy({
      account: request.account,
    });

    const isCorrectPassword = await bcrypt.compare(
      request.password,
      member.password,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    if (_.isEqual(member.status, MemberStatus.APPROVED)) {
      throw new UnauthorizedException(
        '계정이 활성화된 상태가 아닙니다. 관리자에게 문의 해주세요',
      );
    }
  }

  private async hash(plainText: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(plainText, saltOrRounds);
  }
}
