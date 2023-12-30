import { UpdateStockDto } from '@base/stock/dto';
import { Part, Stock, StockRepository } from '@entity/base';
import { PartRepository } from '@entity/base/part.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class StockService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly partRepository: PartRepository,
  ) {}

  async updateStock(updateStockDto: UpdateStockDto) {
    const { partId, lot, amount } = updateStockDto;

    const part = await this.partRepository.findOneBy({
      id: partId,
    });

    if (!part) {
      throw new NotFoundException('해당 부품을 통해서 조회할 수 없습니다.');
    }

    const stock = await this.stockRepository.findOneBy({
      part,
      lot,
    });

    if (amount > 0) {
      await this.addStock(stock, part, lot, amount);
    }

    if (amount < 0) {
      await this.subtractStock(stock, amount);
    }
  }

  private async addStock(
    stock: Stock,
    part: Part,
    lot: string,
    amount: number,
  ) {
    if (stock) {
      stock.amount = stock.amount + amount;
      await this.stockRepository.save(stock);
    } else {
      const newStock = new Stock();
      newStock.part = part;
      newStock.lot = lot;
      newStock.amount = amount;
      await this.stockRepository.save(newStock);
    }
  }

  private async subtractStock(stock: Stock, amount: number) {
    if (stock) {
      if (stock.amount + amount >= 0) {
        stock.amount = stock.amount + amount;
        await this.stockRepository.save(stock);
      } else {
        throw new BadRequestException(
          '해당 부품과 로트의 재고가 출고하려는 양보다 적습니다.',
        );
      }
    } else {
      throw new NotFoundException(
        '해당 부품과 로트를 통해 조회할 수 없습니다.',
      );
    }
  }
}
