export interface SignUpRequest {
  account: string;
  password: string;
  email?: string;
  phone?: string;
  memo?: string;
  companyId: number;
}

export interface SignInRequest {
  account: string;
  password: string;
}
