'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import SubscriptionStandard from '@/src/components/pricing/subscription-payments/Standard';
import CustomerPayments from '@/src/components/subscription-payments/customer-payments';
import PaymentDetails from '@/src/components/subscription-payments/payment-details';
import { useCustomerPayments } from '@/src/store/customer-payments';
import { usePayment } from '@/src/hooks/usePayment';
import { CircularProgress } from '@mui/material';

const PricingPlans = () => {
  const {
    member_qty: memberQty,
    price_plan: pricePlan,
    plan,
  } = useCustomerPayments(state => state);

  const { handleSubscription, isLoading } = usePayment();

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
      <Box
        sx={{
          width: '100%',
          maxWidth: 950,
          marginTop: 30,
          padding: '5vh',
          borderRadius: '10px',
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} lg={6} sx={{ padding: '10px' }}>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 100,
                textAlign: 'left',
                paddingBottom: 4,
              }}
            >
              Pembayaran Langganan
            </Typography>
            <CustomerPayments />
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 100,
                textAlign: 'left',
                paddingBottom: 4,
                mt: 5,
              }}
            >
              Rincian Pembayaran
            </Typography>
            <PaymentDetails />
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', alignItems: 'center', mt: 5 }}
            >
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={() =>
                  handleSubscription({
                    plan,
                    price: pricePlan,
                    quantity: memberQty,
                  })
                }
              >
                {isLoading ? (
                  <CircularProgress disableShrink color='inherit' size={24} />
                ) : (
                  'Lanjut ke pembayaran'
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} lg={6} sx={{ padding: '10px' }}>
            <SubscriptionStandard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PricingPlans;
