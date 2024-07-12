'use client';

// ** React Imports
import { useState } from 'react';

// ** Next Imports
import Link from 'next/link';

// ** MUI Components
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Third Party Imports
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// ** Hooks
import { useAuth } from 'src/hooks/useAuth';

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
      color: theme.palette.text.secondary,
    },
  }),
);

const typedSchema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup.string().email('Format Email Salah').required('Email Harus Diisi'),
  password: yup.string().min(5).required(),
});

const defaultValues = {
  password: '',
  email: '',
};

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ** Hooks
  const auth = useAuth();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(typedSchema),
  });

  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    auth.login(
      {
        email,
        password,
        rememberMe,
        shouldRedirect: true,
      },
      () => {
        setError('email', {
          type: 'manual',
          message: 'Email or Password is invalid',
        });
      },
    );
  };

  return (
    <Box
      className='content-right'
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 550,
          boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)',
          padding: '5vh',
          borderRadius: '10px',
        }}
      >
        <Box sx={{ my: 6 }}>
          <Typography
            sx={{
              mb: 1.5,
              fontWeight: 700,
              fontSize: '1.625rem',
              lineHeight: 1.385,
              textAlign: 'center',
            }}
          >
            Selamat Datang
          </Typography>
          <Typography sx={{ display: 'flex', textAlign: 'center' }}>
            Masukkan E-mail dan kata sandi untuk menggunakan website Face
            Recognition Management Employee{' '}
          </Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  label='Email Owner'
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  placeholder='admin@vuexy.com'
                />
              )}
            />
            {errors.email && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 1.5 }}>
            <InputLabel
              htmlFor='auth-login-v2-password'
              error={Boolean(errors.password)}
            >
              Password
            </InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  label='Kata Sandi'
                  onChange={onChange}
                  id='auth-login-v2-password'
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                          fontSize={20}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <Box
            sx={{
              mb: 1.75,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormControlLabel
              label='Ingat Saya'
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
              }
            />
          </Box>
          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            sx={{ mb: 4 }}
          >
            Masuk
          </Button>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'text.secondary', mr: 2 }}>
              Baru di platform kami?
            </Typography>
            <Typography variant='body2'>
              <LinkStyled href='/register' sx={{ fontSize: '1rem' }}>
                Buat sebuah akun
              </LinkStyled>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
