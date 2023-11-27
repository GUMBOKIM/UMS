export interface SignUpRequestBody {
  account: string;
  password: string;
  email?: string;
  phone?: string;
  memo?: string;
  companyId: number;
}

export interface SignInRequestBody {
  account: string;
  password: string;
}
