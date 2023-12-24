export class ProviderCustomerMapResDto {
  id: number;
  provider: {
    id: number;
    name: string;
  };
  customer: {
    id: number;
    name: string;
  };
}
