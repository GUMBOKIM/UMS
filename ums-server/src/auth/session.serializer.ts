import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Member } from '../entity/member';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(member: Member, done: (err: Error, user: any) => void): any {
    done(null, member);
  }

  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
