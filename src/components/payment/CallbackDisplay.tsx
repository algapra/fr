import { Alert } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

type CallbackDisplayProps = {
  redirectUrl?: string;
};

export const CallbackDisplay: FC<CallbackDisplayProps> = ({
  redirectUrl = '/dashboard',
}) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='flex flex-col w-[610px] h-[520px] bg-white p-[65px] rounded-lg shadow-lg items-center justify-center'>
        <Image
          src='/images/payments/laptop-girl.png'
          alt='Laptop Girl'
          width={150}
          height={170}
        />
        <h1 className='font-bold mb-4 text-[#23A26D]'>Pembayaran Berhasil!</h1>
        <p className='text-[#4B465C] mb-4 font-light text-lg'>
          Terima kasih telah melakukan pembayaran, layanan akan segera aktif.
        </p>
        <Alert
          icon={<PriorityHighIcon fontSize='inherit' />}
          severity='info'
          className='w-full text-center'
        >
          Jika Anda tidak diarahkan secara otomatis,{' '}
          <a href={redirectUrl} className='text-blue-500 underline'>
            klik di sini
          </a>
          .
        </Alert>
      </div>
    </div>
  );
};
