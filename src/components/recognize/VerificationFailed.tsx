import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';

function VerificationFailed() {
  const [countdown, setCountdown] = useState(5000);
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
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
                <Image src="/failed.svg" alt="Failed" height={200} width={200}/>
                <Dialog.Title
                  as="h3"
                  className="text-lg mt-5 font-bold text-[40px] leading-6 text-[#DC2626]"
                >
                  Verifikasi Gagal
                </Dialog.Title>
                <p className="text-[27px] text-[#474747] mt-3 font-normal">
                  Mohon pastikan wajah anda lurus menghadap kamera
                </p>
                <div className="w-full">
                  <hr className="my-6 h-0.5 border-t-0 bg-[#EDEDED]" />
                </div>

                <button
                  type="button"
                  className="w-full text-white bg-[#0075FF] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 rounded-full"
                  onClick={closeModal}
                >
                  Ulangi Verifikasi
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default VerificationFailed;
