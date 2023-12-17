import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { UpdateStockDto } from './dto';
import { StockService } from './stock.service';
import { SessionGuard } from '@auth/session/session.guard';

@UseGuards(SessionGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Put()
  updateStock(@Body() updateStockDto: UpdateStockDto) {
    return this.stockService.updateStock(updateStockDto);
  }

  // @Get('company/:companyId')
  // findStocksByCompany(
  //   @Login() loginMember: LoginMember,
  //   @Param() companyId: number,
  // ) {
  //   const { id: companyId, type: companyType } = loginMember.company;
  //   return this.stockService.findStocksByCompany(companyId, companyType);
  // }
}
