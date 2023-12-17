import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Part } from './part.entity';

@Injectable()
export class PartRepository extends Repository<Part> {
  constructor(private dataSource: DataSource) {
    super(Part, dataSource.createEntityManager());
  }

  async customMethod(id: number): Promise<Part> {
    return await this.createQueryBuilder('stock')
      .where('stock.id = :id', { id })
      .getOneOrFail();
  }
}
