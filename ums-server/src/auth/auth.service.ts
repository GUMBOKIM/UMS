import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { LoginMember } from './session/dto';
import { setLoginMemberOnRequest } from './session/session.util';
import { SignUpDto, SignInDto } from './dto';
import { Company, Member } from '@entity/base';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async signUp(requestBody: SignUpDto) {
    await this.duplicateMemberCheck(requestBody.account);

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

    await this.memberRepository.save(member);
    return member;
  }

  private async hash(plainText: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(plainText, saltOrRounds);
  }

  private async duplicateMemberCheck(account: string) {
    const existMember = await this.memberRepository.findOneBy({
      account: account,
    });

    if (!_.isEmpty(existMember)) {
      throw new BadRequestException('동일한 아이디의 계정이 존재합니다.');
    }
  }

  async validateMember(request: SignInDto) {
    const member = await this.memberRepository.findOneBy({
      account: request.account,
    });

    if (!member) {
      throw new BadRequestException('해당 계정이 존재하지 않습니다.');
    }

    const isCorrectPassword = await bcrypt.compare(
      request.password,
      member.password,
    );
    if (!isCorrectPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return member;
  }

  setLoginSession(request: any, member: Member) {
    const loginMember: LoginMember = {
      account: member.account,
      email: member.email,
      id: member.id,
      memo: member.memo,
      phone: member.phone,
      company: {
        id: member.company.id,
        name: member.company.name,
        type: member.company.type,
      },
    };
    setLoginMemberOnRequest(request, loginMember);
    return loginMember;
  }
}
