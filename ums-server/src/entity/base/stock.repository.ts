import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Stock } from './stock.entity';

@Injectable()
export class StockRepository extends Repository<Stock> {
  constructor(private dataSource: DataSource) {
    super(Stock, dataSource.createEntityManager());
  }

  async customMethod(id: number): Promise<Stock> {
    return await this.createQueryBuilder('stock')
      .where('stock.id = :id', { id })
      .getOneOrFail();
  }
}
