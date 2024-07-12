'use client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Button, Grid } from '@mui/material';
import PricingStandard from '@/src/components/pricing/pricing-plans/Standard';
import PricingPremium from '@/src/components/pricing/pricing-plans/Premium';
import Spinner from 'src/@core/components/spinner';
import { useAuth } from '@/src/hooks/useAuth';
import { useState } from 'react';

const PricingPlans = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const { logout } = useAuth();

  return (
    <Box
      className='content-right'
      sx={{
        backgroundColor: 'background.paper',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <div className='absolute top-5 right-8'>
        {loadingButton ? (
          <Spinner sx={{ height: '20px', width: '60px' }} />
        ) : (
          <Button
            variant='text'
            type='button'
            onClick={() => {
              setLoadingButton(true);
              logout();
            }}
            className='font-semibold text-base'
          >
            LOGOUT
          </Button>
        )}
      </div>
      <Box
        sx={{
          width: '100%',
          maxWidth: 950,
          boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)',
          padding: '5vh',
          borderRadius: '10px',
        }}
      >
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography
            sx={{
              mb: 1.5,
              fontWeight: 700,
              fontSize: '2rem',
              lineHeight: 1.385,
              textAlign: 'center',
            }}
          >
            Pricing Plans
          </Typography>
          <Typography
            sx={{
              mb: 1.5,
              fontWeight: 200,
              fontSize: '1rem',
              lineHeight: 1.385,
              textAlign: 'center',
            }}
          >
            Choose the best plan to fit your needs.
          </Typography>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} lg={6} sx={{ padding: '10px' }}>
            <PricingStandard />
          </Grid>
          <Grid item xs={12} sm={6} lg={6} sx={{ padding: '10px' }}>
            <PricingPremium />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PricingPlans;
