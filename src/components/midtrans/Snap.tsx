import { useConfig } from '@/src/context/ConfigContext';
import { useEffect } from 'react';

const MidtransSnap = () => {
  const { config } = useConfig();
  useEffect(() => {
    // render midtrans snap token
    const snapScript = config?.midtransIsProd
      ? 'https://app.midtrans.com'
      : 'https://app.sandbox.midtrans.com';

    const script = document.createElement('script');
    script.src = snapScript + '/snap/snap.js';
    script.setAttribute('data-client-key', config?.midtransClientKey as string);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [config]);

  return <></>;
};

export default MidtransSnap;
