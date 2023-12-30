import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class FindReceivePlanQuery {
  @IsNotEmpty()
  companyIds: number[];

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startedAt: Date;

  @Transform((value) => value ?? value.obj.startedAt)
  @Type(() => Date)
  @IsDate()
  endedAt?: Date;
}
