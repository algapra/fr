'use client';

import { GlobalConfig } from '@/@types/global-config';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ContextType = {
  config: GlobalConfig | null;
  setConfig: (...args: any) => void;
};

const getConfig = () => {
  return fetch('/api/config').catch(e => {
    console.error(e);
  });
};

export const ConfigContext = createContext<ContextType>({
  config: null,
  setConfig: () => null,
});

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  return context;
};

export const ConfigContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<any | null>(null);

  useEffect(() => {
    if (config) {
      return;
    }
    getConfig().then(res => {
      if (res) {
        res
          .json()
          .then(data => {
            setConfig(data);
          })
          .catch(e => {
            console.error('error getting config' + e);
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigContext.Provider
      value={useMemo(
        () => ({
          config,
          setConfig,
        }),
        [config, setConfig],
      )}
    >
      {children}
    </ConfigContext.Provider>
  );
};
