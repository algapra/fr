
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import { Radio, Typography } from '@mui/material';

const PaymentMethod = () => {
  return (
    <Card sx={{ boxShadow: 10 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          
          <img src="/images/payments/Icon.png" alt="Standard Plans" width="40px"/>
          <Grid item xs={10} sx={{paddingLeft: 5}}>
            <Typography variant="body1" sx={{textAlign: 'left', marginLeft: 2}}>
              Transfer Bank/Kartu Kredit/Kartu Debit
            </Typography>
            <Typography sx={{fontSize: 10}}>Pembayaran dapat melalui transfer bank, kartu kredit atau kartu debit</Typography>
          </Grid>
          <Grid item xs={0.5}>
            <Radio color="primary" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PaymentMethod
