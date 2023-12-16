export interface SignUpDto {
  account: string;
  password: string;
  email?: string;
  phone?: string;
  memo?: string;
  companyId: number;
}
