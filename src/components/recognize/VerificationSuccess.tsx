import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface VerificationSuccessProps {
  responseData: any;
}

function VerificationSuccess({ responseData }: VerificationSuccessProps) {
  const [countdown, setCountdown] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [startTime, setStartTime] = useState("");
  
  useEffect(() => {
    setCountdown(5);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    // Set waktu absen saat modal ditampilkan
    const currentTime = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' };
    const formattedTime = currentTime.toLocaleTimeString('id-ID', options as Intl.DateTimeFormatOptions);
    setStartTime(formattedTime);

    return () => clearInterval(timer);
  },[]);

  useEffect(() => {
    if (countdown === 1) {
      setIsOpen(false);
    }
  }, [countdown]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center flex justify-center items-center flex-col align-middle shadow-xl transition-all">
                <Image
                  src="/success.svg"
                  alt="Success"
                  height={200}
                  width={200}
                />
                <p className="text-md text-[#474747] font-medium text-[27px]">
                  Verifikasi Selesai
                </p>
                <Dialog.Title
                  as="h3"
                  className="mt-5 font-bold text-[40px] leading-6 text-gray-900"
                >
                  {responseData?.return[0].user_name.split(' ').slice(0, 2).join(' ')}
                  <br />
                  <br />
                  {responseData?.return[0].user_name.split(' ').slice(2).join(' ')}
                </Dialog.Title>
                <Dialog.Title
                  as="h3"
                  className="text-lg mt-10 font-bold text-[25px] leading-6 text-gray-900"
                >
                  {startTime} WIB {/* Menampilkan waktu absen dalam format yang diinginkan */}
                </Dialog.Title>
                <div className="w-full">
                  <hr className="my-6 h-0.5 border-t-0 bg-[#EDEDED]" />
                </div>
                {countdown > 0 && (
                  <p className="text-[27px] text-[#474747] mt-3 font-normal">
                    Ditutup dalam {countdown}...
                  </p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default VerificationSuccess;
