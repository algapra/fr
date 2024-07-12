import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { Button, Typography } from '@mui/material';
import { useCustomerPayments } from '@/src/store/customer-payments';

const PaymentDetails = () => {
  const memberQty = useCustomerPayments(state => state.member_qty);
  const pricePlan = useCustomerPayments(state => state.price_plan);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  return (
    <Card sx={{ boxShadow: 10 }}>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label='Voucher'
              InputLabelProps={{ shrink: true }}
              style={{ textAlign: 'left' }}
              placeholder='Gunakan Voucher'
            />
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant='contained' color='primary'>
              Apply
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={5} mt={2}>
          <Grid item xs={6}>
            <Typography sx={{ textAlign: 'left' }}>Harga Per Member</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ textAlign: 'right' }}>
              {formatPrice(pricePlan)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={5} mt={0.5}>
          <Grid item xs={6}>
            <Typography sx={{ textAlign: 'left' }}>Jumlah Member</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ textAlign: 'right' }}>
              {memberQty} Member
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={5} mt={0.5}>
          <Grid item xs={6}>
            <Typography sx={{ textAlign: 'left' }}>Total Harga</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ textAlign: 'right', color: '#7367F0' }}>
              {formatPrice(memberQty * pricePlan)}
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={5} mt={0.5}>
          <Grid item xs={6}>
            <Typography sx={{ textAlign: 'left', fontSize: 25 }}>
              Total Bayar
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ textAlign: 'right', color: '#7367F0', fontSize: 25 }}
            >
              {formatPrice(memberQty * pricePlan)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentDetails;
