'use client';

import { UserDataType } from '@/src/context/types';
import { useAuth } from '@/src/hooks/useAuth';
import { usePayment } from '@/src/hooks/usePayment';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

const InternalPaymentSimulator: FC = () => {
  const [invoice, setInvoice] = useState('');
  const { me, setUser } = useAuth();
  const router = useRouter();

  const { ferifyPayment } = usePayment();
  const onSubmit = (e: any) => {
    e.preventDefault();
    ferifyPayment({
      invoiceId: invoice,
      status: 'settlement',
      statusCode: '200',
      simulation: true,
    })
      .then(() => me())
      .then(data =>
        setUser({ company: { plan: data.company.plan } } as UserDataType),
      )
      .finally(() => {
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      });
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex'>
        <h1>Pay Your Invoice Here</h1>
      </div>
      <div className='flex'>
        <form onSubmit={onSubmit}>
          <table>
            <tr>
              <td>Invoice ID</td>
              <td>
                <input
                  type='text'
                  value={invoice}
                  onChange={e => setInvoice(e.target.value)}
                  className='border border-gray-300 rounded-md px-2 py-1'
                  placeholder='ex: TRX-1234-1234567890'
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md'
                >
                  Pay
                </button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};
export default InternalPaymentSimulator;
