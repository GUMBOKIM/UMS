import { IsNotEmpty } from 'class-validator';

export class ProviderCustomerMapReqDto {
  @IsNotEmpty()
  providerId: number;

  @IsNotEmpty()
  customerId: number;
}
