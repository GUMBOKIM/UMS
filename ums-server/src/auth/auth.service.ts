import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInRequestBody, SignUpRequestBody } from './auth.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Member, MemberStatus } from '../entity/member';
import { Repository } from 'typeorm';
import { Company } from '../entity/company';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async signUp(requestBody: SignUpRequestBody) {
    const existMember = await this.memberRepository.findOneBy({
      account: requestBody.account,
    });

    if (!_.isEmpty(existMember)) {
      throw new BadRequestException('동일한 아이디의 계정이 존재합니다.');
    }

    const company = await this.companyRepository.findOneBy({
      id: requestBody.companyId,
    });

    if (_.isEmpty(company)) {
      throw new BadRequestException('올바른 회사 코드가 아닙니다.');
    }

    const hashedPassword = await this.hash(requestBody.password);

    const member = new Member();
    member.account = requestBody.account;
    member.password = hashedPassword;
    member.email = requestBody.email;
    member.phone = requestBody.phone;
    member.memo = requestBody.memo;
    member.company = company;
    member.status = MemberStatus.NOT_APPROVED;

    await this.memberRepository.save(member);
  }

  async signIn(requestBody: SignInRequestBody) {
    const member = await this.memberRepository.findOneBy({
      account: requestBody.account,
    });

    const isCorrectPassword = await bcrypt.compare(
      requestBody.password,
      member.password,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return {
      id: member.id,
      account: member.account,
    };
  }

  async logout(request: Request) {
    console.log(request);
  }

  private async hash(plainText: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(plainText, saltOrRounds);
  }
}
