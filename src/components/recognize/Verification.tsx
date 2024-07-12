'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SweetAlert2 from 'react-sweetalert2';
import to from 'await-to-js';
import { apiRequest } from 'src/utils/request';

function Verification() {
  const [isOpen, setIsOpen] = useState(false);
  const [nik, setNik] = useState('');
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState('');
  const [swalProps, setSwalProps] = useState({});

  const handleChangeNik = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNik(e.target.value);
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setUserImage(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (userImage) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        let base64String = '';
        if (typeof reader.result === 'string') {
          base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
          setUserImage(base64String);
        } else {
          console.error('Failed to read the file.');
        }

        const data = {
          user_id: nik,
          user_name: username,
          image: base64String,
        };

        const [err, res] = await to(
          apiRequest.post('/upload', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          }),
        );

        if (err) {
          setSwalProps({
            show: true,
            title: 'Upload Failed!',
            icon: 'error',
            text: 'Gagal mengunggah gambar ke server',
          });

          return;
        }
        if (res.data.data.status === '200') {
          setSwalProps({
            show: true,
            title: 'Upload Success!',
            icon: 'success',
            text: 'Berhasil mengunggah gambar ke server',
          });
        }
      };
      reader.readAsDataURL(userImage as any);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className='verification'>
        <h1 className='verification-title'>Verifikasi Wajah</h1>
        <p style={{ marginTop: -20 }}>
          Silahkan verifikasi wajah dilayar untuk <br />
          diidentifikasi
        </p>
        {/* <div className="flex items-center justify-center w-full">
          <button
            type="button"
            onClick={openModal}
            className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Add user
          </button>
        </div> */}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Add User
                  </Dialog.Title>

                  <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
                    <div className='mb-5'>
                      <label
                        htmlFor='nik'
                        className='block mb-2 text-sm font-medium text-gray-900'
                      >
                        NIK
                      </label>
                      <input
                        value={nik}
                        onChange={handleChangeNik}
                        type='number'
                        id='nik'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='name@flowbite.com'
                        required
                      />
                    </div>
                    <div className='mb-5'>
                      <label
                        htmlFor='username'
                        className='block mb-2 text-sm font-medium text-gray-900'
                      >
                        Nama
                      </label>
                      <input
                        value={username}
                        onChange={handleChangeUsername}
                        type='username'
                        id='username'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        required
                      />
                    </div>
                    <label
                      className='block mb-2 text-sm font-medium text-gray-900'
                      htmlFor='user_image'
                    >
                      Upload file
                    </label>
                    <input
                      onChange={handleImageChange}
                      className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
                      aria-describedby='user_avatar_help'
                      id='user_avatar'
                      type='file'
                      required
                    ></input>
                    <button
                      type='submit'
                      className='text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <SweetAlert2 {...swalProps}></SweetAlert2>
    </>
  );
}

export default Verification;
