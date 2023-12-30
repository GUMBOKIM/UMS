import { ReceivePlan } from '@entity/receive/receive-plan.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReceivePlanRepository extends Repository<ReceivePlan> {
  constructor(private dataSource: DataSource) {
    super(ReceivePlan, dataSource.createEntityManager());
  }

  async customMethod(id: number): Promise<ReceivePlan> {
    return await this.createQueryBuilder('stock')
      .where('stock.id = :id', { id })
      .getOneOrFail();
  }
}
