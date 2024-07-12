'use client';

// ** React Imports
import { useState } from 'react';

// ** Next Import
import Link from 'next/link';

// ** MUI Components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// ** Third Party Imports

// ** Hooks
import { Grid, Step, StepLabel, Stepper } from '@mui/material';

import StepperWrapper from 'src/@core/styles/mui/stepper';
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot';
import { Show } from '@/src/components/utils/Show';
import { StepContent } from './StepContent';

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const steps = [
  {
    title: 'Data Perusahaan',
  },
  {
    title: 'Data Owner',
  },
];

export const Content = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 600, mb: 12 }}>
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
            Pendaftaran Akun
          </Typography>
          <Typography sx={{ display: 'flex', textAlign: 'center' }}>
            Masukan detail data-data untuk menggunakan website face recognition
            management employee
          </Typography>
        </Box>
        <StepperWrapper>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(step => {
              const labelProps: {
                error?: boolean;
              } = {};

              return (
                <Step key={step.title}>
                  <StepLabel
                    {...labelProps}
                    StepIconComponent={StepperCustomDot}
                  >
                    <div className='step-label'>
                      <div>
                        <Typography className='step-title'>
                          {step.title}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </Box>
      <Grid container spacing={5} marginBottom={5}>
        <StepContent step={activeStep} setStep={step => setActiveStep(step)} />
      </Grid>
      <Show>
        <Show.When isTrue={activeStep !== steps.length - 1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'text.secondary', mr: 2 }}>
              Sudah Punya Akun?
            </Typography>
            <Typography variant='body2'>
              <LinkStyled href='/login' sx={{ fontSize: '1rem' }}>
                Masuk disini
              </LinkStyled>
            </Typography>
          </Box>
        </Show.When>
      </Show>
    </>
  );
};
