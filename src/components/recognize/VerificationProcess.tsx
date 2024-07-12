import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function VerificationProcess() {

  const [countdown, setCountdown] = useState(2);
  const [visible, setVisible] = useState(true);


  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setVisible(false);
    }
  }, [countdown]);

  if (!visible) {
    return null;
  }

  return (
    <div className='verification'>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '4rem', marginBottom: '10px', color: '#0075FF' }} />
        <h1 className='verification-title' style={{ fontSize: '2rem' }}>Proses Verifikasi</h1>
      </div>
      <p style={{ marginTop: '-20px'}}>Mohon posisikan wajah lurus menghadap kamera</p>
    </div>
  );
}

export default VerificationProcess;
