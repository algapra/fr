'use client';

// ** React Imports

// ** Next Import

// ** MUI Components
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Icon from 'src/@core/components/icon';

// ** Third Party Imports
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';

// ** Hooks
import { useAuth } from 'src/hooks/useAuth';
import {
  Alert,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import { listBidangUsaha, listJenisInstansi } from './dropdown-data';
import { useYupValidationResolver } from '@/src/utils/form/validator';
import { isEmpty } from '@/src/utils/object';
import { useEffect, useState } from 'react';
import { getExistance } from '@/src/services/users';
import toast from 'react-hot-toast';

type FormDataInstansi = {
  companyType: string;
  companyField: string;
  companyName: string;
  companyAddress: string;
  companyPhoneNumber: string;
  companyEmail: string;
  memberCount: number;
};

type FormDataOwner = {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
  termsCheck: boolean;
  companyCheck: boolean;
};

export const StepContent = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) => {
  const defaultValuesInstansi = {
    companyType: '',
    companyField: '',
    companyName: '',
    companyAddress: '',
    companyPhoneNumber: '',
    companyEmail: '',
    memberCount: 0,
  };

  const defaultValuesOwner = {
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    passwordConfirm: '',
    address: '',
    termsCheck: false,
    companyCheck: false,
  };

  // ** Hooks
  const { register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirm: false,
  });

  const instansiSchema: yup.SchemaOf<FormDataInstansi> = yup.object().shape({
    companyType: yup.string().required('Jenis Instansi harus diisi'),
    companyField: yup.string().required('Bidang Perusahaan harus diisi'),
    companyName: yup
      .string()
      .min(3, 'Nama Instansi Minimal 3 Karakter')
      .required('Nama Instansi harus diisi'),
    companyAddress: yup
      .string()
      .min(3, 'Alamat Instansi Minimal 3 Karakter')
      .required('Alamat Instansi harus diisi'),
    companyPhoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Nomor Telepon Instansi harus angka')
      .min(10, 'Nomor Telepon Instansi Minimal 10 Karakter')
      .required('Nomor Telepon Instansi harus diisi'),
    companyEmail: yup
      .string()
      .email('Format Email Tidak Sesuai')
      .required('Email Instansi harus diisi'),
    memberCount: yup
      .number()
      .min(1, 'Jumlah Member Minimal 1')
      .required('Jumlah Member harus diisi'),
  });

  const ownerSchema: yup.SchemaOf<FormDataOwner> = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Nama Owner Minimal 3 Karakter')
      .required('Nama Owner harus diisi'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Nomor Telepon Owner harus angka')
      .min(10)
      .required('Nomor Telepon Owner harus diisi'),
    email: yup.string().email().required('Email Owner harus diisi'),
    password: yup.string().required('Password harus diisi'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password tidak sama')
      .required('Konfirmasi Password harus diisi'),
    address: yup.string().min(3).required(),
    termsCheck: yup
      .boolean()
      .oneOf([true], 'Anda harus menerima kebijakan & ketentuan privasi')
      .required(),
    companyCheck: yup
      .boolean()
      .oneOf(
        [true],
        'Anda harus menerima bahwa anda mewakili perusahaan untuk mendaftar pada layalanan kami',
      )
      .required(),
  });

  // ** Hooks
  const {
    control: instansiControl,
    handleSubmit: handleInstansiSubmit,
    formState: { errors: instansiErrors },
    getValues: getInstansiValues,
    setError: setInstansiError,
  } = useForm<FormDataInstansi>({
    defaultValues: defaultValuesInstansi,
    resolver: useYupValidationResolver(instansiSchema),
    mode: 'onChange',
  });

  const {
    control: ownerControl,
    handleSubmit: handleOwnerSubmit,
    formState: { errors: ownerErrors },
    getValues: getOwnerValues,
    setError: setOwnerError,
  } = useForm<FormDataOwner>({
    defaultValues: defaultValuesOwner,
    resolver: useYupValidationResolver(ownerSchema),
    mode: 'onChange',
  });

  const onNext = () => {
    if (!isEmpty(instansiErrors)) {
      return;
    }
    setStep(step + 1);
  };

  const onSubmit = () => {
    if (!isEmpty(ownerErrors) || !isEmpty(instansiErrors)) {
      return;
    }

    const instansiData = getInstansiValues();
    const ownerData = getOwnerValues();
    const data = { ...instansiData, ...ownerData };

    const {
      companyType,
      companyField,
      companyName,
      companyAddress,
      companyPhoneNumber,
      companyEmail,
      memberCount,
      name,
      phoneNumber,
      email,
      password,
      address,
    } = data;
    register(
      {
        companyType,
        companyField,
        companyName,
        companyAddress,
        companyPhoneNumber,
        companyEmail,
        memberCount,
        name,
        phoneNumber,
        email,
        password,
        address,
      },
      err => {
        if (err.name === 'AxiosError') {
          toast.error('Terjadi kesalahan, silahkan coba lagi');

          return;
        }
        if (err.companyType) {
          setInstansiError('companyType', {
            type: 'manual',
            message: err.companyType,
          });
        }
        if (err.companyField) {
          setInstansiError('companyField', {
            type: 'manual',
            message: err.companyField,
          });
        }
        if (err.companyName) {
          setInstansiError('companyName', {
            type: 'manual',
            message: err.companyName,
          });
        }
        if (err.companyAddress) {
          setInstansiError('companyAddress', {
            type: 'manual',
            message: err.companyAddress,
          });
        }
        if (err.companyPhoneNumber) {
          setInstansiError('companyPhoneNumber', {
            type: 'manual',
            message: err.companyPhoneNumber,
          });
        }
        if (err.companyEmail) {
          setInstansiError('companyEmail', {
            type: 'manual',
            message: err.companyEmail,
          });
        }
        if (err.memberCount) {
          setInstansiError('memberCount', {
            type: 'manual',
            message: err.memberCount,
          });
        }
        if (err.name) {
          setOwnerError('name', {
            type: 'manual',
            message: err.name,
          });
        }
        if (err.phoneNumber) {
          setOwnerError('phoneNumber', {
            type: 'manual',
            message: err.phoneNumber,
          });
        }
        if (err.email) {
          setOwnerError('email', {
            type: 'manual',
            message: err.email,
          });
        }
        if (err.address) {
          setOwnerError('address', {
            type: 'manual',
            message: err.address,
          });
        }
      },
    );
  };

  // Handle Stepper
  const handleBack = () => {
    setStep(step - 1);
  };

  const onOwnerEmailChanged = () => {
    const email = getOwnerValues().email;
    if (!email) {
      return;
    }
    getExistance('email', { param: email }).then(res => {
      if (res.data.exists) {
        setOwnerError('email', {
          type: 'manual',
          message: 'Email sudah terdaftar',
        });
      }
    });
  };

  switch (step) {
    case 0:
      return (
        <form key={step} onSubmit={handleInstansiSubmit(onNext)}>
          <Box sx={{ alignContent: 'center' }}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel id='jenis-instansi-select'>Jenis Instansi</InputLabel>
              <Controller
                name='companyType'
                control={instansiControl}
                defaultValue=''
                render={({ field }) => (
                  <Select
                    {...field}
                    label='Jenis Instansi'
                    fullWidth
                    sx={{ mr: 4, mb: 2, color: 'black' }}
                    labelId='jenis-instansi-select'
                    inputProps={{ placeholder: 'Pilih jenis instansi' }}
                    error={Boolean(instansiErrors.companyType)}
                  >
                    <MenuItem value={''}>Pilih Jenis Instansi</MenuItem>
                    {listJenisInstansi.map(d => {
                      return (
                        <MenuItem key={d.id} value={d.name}>
                          {d.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {instansiErrors.companyType && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {instansiErrors.companyType.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel id='bidang-perusahaan-select'>
                Bidang Perusahaan
              </InputLabel>
              <Controller
                name='companyField'
                control={instansiControl}
                defaultValue=''
                render={({ field }) => (
                  <Select
                    {...field}
                    label='Bidang Perusahaan'
                    fullWidth
                    sx={{ mr: 4, mb: 2, color: 'black' }}
                    labelId='bidang-perusahaan-select'
                    inputProps={{ placeholder: 'Pilih Bidang Perusahaan' }}
                    error={Boolean(instansiErrors.companyField)}
                  >
                    <MenuItem value={''}>Pilih Bidang Perusahaan</MenuItem>
                    {listBidangUsaha.map(d => {
                      return (
                        <MenuItem key={d.id} value={d.name}>
                          {d.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              {instansiErrors.companyField && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {instansiErrors.companyField.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='companyName'
                control={instansiControl}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    value={value}
                    onBlur={onBlur}
                    label='Nama Instansi'
                    onChange={onChange}
                    placeholder='Masukan nama instansi'
                    error={Boolean(instansiErrors.companyName)}
                  />
                )}
              />
              {instansiErrors.companyName && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {instansiErrors.companyName.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='companyAddress'
                control={instansiControl}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    rows={2}
                    value={value}
                    multiline
                    onBlur={onBlur}
                    label='Alamat Instansi'
                    onChange={onChange}
                    placeholder='Masukan detail alamat instansi'
                    error={Boolean(instansiErrors.companyAddress)}
                  />
                )}
              />
              {instansiErrors.companyAddress && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {instansiErrors.companyAddress.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='companyPhoneNumber'
                control={instansiControl}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    label='Nomor Telepon Instansi'
                    onChange={onChange}
                    placeholder='Contoh: 08xxxxxxxx'
                    error={Boolean(instansiErrors.companyPhoneNumber)}
                  />
                )}
              />
              {instansiErrors.companyPhoneNumber && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {instansiErrors.companyPhoneNumber.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='companyEmail'
                control={instansiControl}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label='Email Instansi'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(instansiErrors.companyEmail)}
                    placeholder='Contoh: hello@perusahaan.com'
                  />
                )}
              />
              {instansiErrors.companyEmail && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {instansiErrors.companyEmail.message}
                </FormHelperText>
              )}
              <Typography sx={{ color: 'text.secondary', fontSize: 11, ml: 3 }}>
                Jika tidak mempunyai email instansi, dapat menggunakan email
                pribadi
              </Typography>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='memberCount'
                control={instansiControl}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label='Jumlah Member'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(instansiErrors.memberCount)}
                    placeholder='Masukan jumlah member'
                  />
                )}
              />
              {instansiErrors.memberCount && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {instansiErrors.memberCount.message}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              sx={{ width: '100%' }}
              size='large'
              variant='contained'
              type='submit'
            >
              Selanjutnya
            </Button>
          </Box>
        </form>
      );
    case 1:
      return (
        <form key={step} onSubmit={handleOwnerSubmit(onSubmit)}>
          <Box>
            <Alert severity='info' sx={{ mb: 4, alignItems: 'center' }}>
              Data yang didaftarkan wajib menggunakan data owner pemilik
              perusahaan
            </Alert>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='name'
                control={ownerControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Nama Owner'
                    onChange={onChange}
                    placeholder='Masukan nama owner'
                    error={Boolean(ownerErrors.name)}
                  />
                )}
              />
              {ownerErrors.name && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {ownerErrors.name.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='address'
                control={ownerControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    rows={2}
                    value={value}
                    multiline
                    label='Alamat Owner'
                    onChange={onChange}
                    placeholder='Masukan detail alamat instansi'
                    error={Boolean(ownerErrors.address)}
                  />
                )}
              />
              {ownerErrors.address && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {ownerErrors.address.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='phoneNumber'
                control={ownerControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Nomor Telepon Owner'
                    onChange={onChange}
                    placeholder='Contoh: 08xxxxxxxx'
                    error={Boolean(ownerErrors.phoneNumber)}
                  />
                )}
              />
              {ownerErrors.phoneNumber && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {ownerErrors.phoneNumber.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={ownerControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Email Owner'
                    onChange={onChange}
                    onBlur={onOwnerEmailChanged}
                    error={Boolean(ownerErrors.email)}
                    placeholder='Contoh: hello@mail.com'
                  />
                )}
              />
              {ownerErrors.email && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {ownerErrors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel
                htmlFor='register-password'
                error={Boolean(ownerErrors.password)}
              >
                Password
              </InputLabel>
              <Controller
                name='password'
                control={ownerControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <OutlinedInput
                    id='register-password'
                    value={value}
                    label='Password'
                    onChange={onChange}
                    error={Boolean(ownerErrors.password)}
                    type={showPassword.password ? 'text' : 'password'}
                    placeholder='********'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              password: !showPassword.password,
                            })
                          }
                        >
                          <Icon
                            icon={
                              showPassword.password
                                ? 'tabler:eye'
                                : 'tabler:eye-off'
                            }
                            fontSize={20}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {ownerErrors.password && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {ownerErrors.password?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel
                htmlFor='register-password-confirm'
                error={Boolean(ownerErrors.passwordConfirm)}
              >
                Konfirmasi Password
              </InputLabel>
              <Controller
                name='passwordConfirm'
                control={ownerControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <OutlinedInput
                    id='register-password-confirm'
                    value={value}
                    label='Konfirmasi Password'
                    onChange={onChange}
                    error={Boolean(ownerErrors.passwordConfirm)}
                    type={showPassword.passwordConfirm ? 'text' : 'password'}
                    placeholder='********'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              passwordConfirm: !showPassword.passwordConfirm,
                            })
                          }
                        >
                          <Icon
                            icon={
                              showPassword.passwordConfirm
                                ? 'tabler:eye'
                                : 'tabler:eye-off'
                            }
                            fontSize={20}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {ownerErrors.passwordConfirm && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {ownerErrors.passwordConfirm?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(ownerErrors.termsCheck)}>
              <Controller
                name='termsCheck'
                control={ownerControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <FormControlLabel
                      sx={{
                        ...(ownerErrors.termsCheck
                          ? { color: 'error.main' }
                          : null),
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.875rem',
                        },
                      }}
                      control={
                        <Checkbox
                          checked={value}
                          onChange={onChange}
                          sx={
                            ownerErrors.termsCheck
                              ? { color: 'error.main' }
                              : null
                          }
                        />
                      }
                      label={
                        <Typography
                          variant='body2'
                          component='span'
                          sx={{
                            color: ownerErrors.termsCheck ? 'error.main' : '',
                          }}
                        >
                          Persetujuan untuk ketentuan layanan dan kebijakan
                          privasi
                        </Typography>
                      }
                    />
                  );
                }}
              />
              {ownerErrors.termsCheck && (
                <FormHelperText sx={{ mt: 0, color: 'error.main' }}>
                  {ownerErrors.termsCheck.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(ownerErrors.companyCheck)}>
              <Controller
                name='companyCheck'
                control={ownerControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <FormControlLabel
                      sx={{
                        ...(ownerErrors.companyCheck
                          ? { color: 'error.main' }
                          : null),
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.875rem',
                        },
                      }}
                      control={
                        <Checkbox
                          checked={value}
                          onChange={onChange}
                          sx={
                            ownerErrors.companyCheck
                              ? { color: 'error.main' }
                              : null
                          }
                        />
                      }
                      label={
                        <Typography
                          variant='body2'
                          component='span'
                          sx={{
                            color: ownerErrors.companyCheck ? 'error.main' : '',
                          }}
                        >
                          Konfirmasi bahwa perusahaan memiliki hak untuk
                          mendaftar layanan atas nama perusahaan
                        </Typography>
                      }
                    />
                  );
                }}
              />
              {ownerErrors.companyCheck && (
                <FormHelperText sx={{ mt: 0, color: 'error.main' }}>
                  {ownerErrors.companyCheck.message}
                </FormHelperText>
              )}
            </FormControl>
            <Grid
              item
              xs={12}
              sx={{
                mt: 6,
                mb: 6,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                onClick={handleBack}
              >
                Kembali
              </Button>
              <Button
                sx={null}
                size='large'
                variant='contained'
                type='submit'
                disabled={
                  loading || !isEmpty(ownerErrors) || !isEmpty(instansiErrors)
                }
              >
                {loading ? (
                  <CircularProgress disableShrink color='inherit' size={24} />
                ) : (
                  'Daftar'
                )}
              </Button>
            </Grid>
          </Box>
        </form>
      );
    default:
      return 'Unknown Step';
  }
};
