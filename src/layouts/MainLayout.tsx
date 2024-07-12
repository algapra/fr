'use client';

import { FC, PropsWithChildren } from 'react';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import {
  SettingsConsumer,
  SettingsProvider,
} from 'src/@core/context/settingsContext';
import { AuthProvider } from 'src/context/AuthContext';
import WindowWrapper from 'src/@core/components/window-wrapper';
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast';
import { Toaster } from 'react-hot-toast';

// ** Prismjs Styles
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css';

import 'src/iconify-bundle/icons-bundle-react';
import { GuardLayout } from './GuardLayout';
import { ConfigContextProvider } from '../context/ConfigContext';
import MidtransSnap from '../components/midtrans/Snap';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigContextProvider>
      <MidtransSnap />
      <AuthProvider>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <WindowWrapper>
                    <GuardLayout>{children}</GuardLayout>
                  </WindowWrapper>
                  <ReactHotToast>
                    <Toaster
                      position={settings.toastPosition}
                      toastOptions={{ className: 'react-hot-toast' }}
                    />
                  </ReactHotToast>
                </ThemeComponent>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </ConfigContextProvider>
  );
};
