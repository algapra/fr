'use client';

// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react';

// ** Next Import
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// ** Axios
import axios from 'axios';

// ** Config
import authConfig from 'src/configs/auth';

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from './types';
import { useLocalStorage } from '../hooks/use-localstorage';

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  me: () => Promise.resolve({} as UserDataType),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const allowedForGuest = ['/login', '/register', '/recognize'];
  const [user, _setUser, removeUserData] = useLocalStorage<UserDataType | null>(
    'userData',
    null,
  );
  const setUser = (data: UserDataType | null) => {
    _setUser({ ...user, ...data } as UserDataType);
  };
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();

  useEffect(() => {
    handleMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMe = async (): Promise<UserDataType> => {
    setLoading(true);

    return axios
      .get(authConfig.meEndpoint)
      .then(async response => {
        setLoading(false);
        setUser({ ...response.data });

        return response.data;
      })
      .catch(() => {
        removeUserData();
        setLoading(false);
        if (!allowedForGuest.includes(pathname as string)) {
          router.replace('/login');
        }
      })
      .finally(() => setLoading(false));
  };

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType,
  ) => {
    setLoading(true);

    return axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        const returnUrl = searchParam?.get('');

        setUser({ ...response.data.userData });

        if (!params.shouldRedirect) {
          return response.data.userData;
        }

        const redirectURL =
          returnUrl && returnUrl !== '/' ? returnUrl : '/dashboard';

        router.replace(redirectURL);
      })
      .catch(err => {
        if (errorCallback) errorCallback(err);
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    axios.post(authConfig.logoutEndpoint).then(() => {
      removeUserData();
      router.push('/login');
    });
  };

  const handleRegister = async (
    params: RegisterParams,
    errorCallback?: ErrCallbackType,
  ) => {
    setLoading(true);

    return axios
      .post(authConfig.registerEndpoint, params)
      .then(() =>
        handleLogin({ email: params.email, password: params.password }),
      )
      .then(() => {
        router.push('/pricing/pricing-plans');
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null,
      )
      .finally(() => setLoading(false));
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    me: handleMe,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
