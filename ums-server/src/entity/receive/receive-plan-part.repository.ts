import { ReceivePlanPart } from '@entity/receive/receive-plan-part.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReceivePlanPartRepository extends Repository<ReceivePlanPart> {
  constructor(private dataSource: DataSource) {
    super(ReceivePlanPart, dataSource.createEntityManager());
  }

  async customMethod(id: number): Promise<ReceivePlanPart> {
    return await this.createQueryBuilder('stock')
      .where('stock.id = :id', { id })
      .getOneOrFail();
  }
}
