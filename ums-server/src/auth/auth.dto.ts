export interface SignUpRequestDto {
  account: string;
  password: string;
  email?: string;
  phone?: string;
  memo?: string;
  companyId: number;
}

export interface SignInRequestDto {
  account: string;
  password: string;
}
