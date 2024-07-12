export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
  shouldRedirect?: boolean;
};

export type RegisterParams = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companyType: string;
  companyField: string;
  companyPhoneNumber: string;
  memberCount: number;
};

export interface Company {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  type: string;
  field: string;
  memberCount: number;
  plan: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDataType {
  id: string;
  email: string;
  username: string;
  password: string;
  emailConfirmedAt: null;
  confirmationToken: string;
  confirmationSentAt: null;
  confirmedAt: null;
  recoveryToken: null;
  recoverySentAt: null;
  lastSignInAt: null;
  rawUserMetadata: RawUserMetadata;
  phone: string;
  role: string;
  phoneConfirmedAt: null;
  createdAt: Date;
  updatedAt: Date;
  company: Company;
}

export interface RawUserMetadata {
  name: string;
  address: string;
}

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
  me: () => Promise<UserDataType>;
};
