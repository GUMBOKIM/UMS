import { IsNotEmpty } from 'class-validator';

export class SupplierProviderMapReqDto {
  @IsNotEmpty()
  supplierId: number;

  @IsNotEmpty()
  providerId: number;
}
