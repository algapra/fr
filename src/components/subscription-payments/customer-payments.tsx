import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { Alert, FormControl, FormHelperText } from '@mui/material';

// ** Third Party Imports
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCustomerPayments } from '@/src/store/customer-payments';
import { useAuth } from '@/src/hooks/useAuth';

const typedSchema: yup.SchemaOf<FormData> = yup.object().shape({
  name: yup.string().min(5).required(),
  phone: yup.string().min(10).required(),
  email: yup.string().email().required(),
  member_qty: yup.number().required(),
});

const defaultValues = {
  name: '',
  phone: '',
  email: '',
  member_qty: 0,
};

interface FormData {
  name: string;
  phone: string;
  email: string;
  member_qty: number;
}

const CustomerPayments = () => {
  const { user, me } = useAuth();

  useEffect(() => {
    me();
  }, []);

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

  const onSubmit = (data: FormData) => {};
  const customerStates = useCustomerPayments(state => state);

  useEffect(() => {
    customerStates.setNames(user?.rawUserMetadata?.name || '');
    customerStates.setEmails(user?.email || '');
    customerStates.setPhones(user?.phone || '');
    customerStates.setMemberQtys(user?.company?.memberCount || 0);
  }, [user]);

  return (
    <Card sx={{ boxShadow: 10 }}>
      <CardContent>
        <Alert
          severity='info'
          sx={{ mb: 4, alignItems: 'center', textAlign: 'left' }}
        >
          Pastikan nama owner, nomor telp dan email yang anda daftarkan benar
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Nama Owner'
                      value={customerStates.name}
                      onBlur={onBlur}
                      onChange={e =>
                        customerStates.setNames(e.currentTarget.value)
                      }
                      placeholder='Nama'
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Nomor Telepon'
                      value={customerStates.phone}
                      onBlur={onBlur}
                      onChange={e =>
                        customerStates.setPhones(e.currentTarget.value)
                      }
                      placeholder='08xxxx'
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={customerStates.email}
                      onBlur={onBlur}
                      onChange={e =>
                        customerStates.setEmails(e.currentTarget.value)
                      }
                      placeholder='carterleonard@gmail.com'
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='member_qty'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Jumlah Member'
                      value={customerStates.member_qty}
                      onBlur={onBlur}
                      onChange={e =>
                        customerStates.setMemberQtys(+e.currentTarget.value)
                      }
                      placeholder='carterleonard@gmail.com'
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerPayments;
