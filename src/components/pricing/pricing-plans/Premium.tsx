// ** MUI Imports
import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const PricingPremium = () => {
  return (
    <Card sx={{ height: 600, border: '1.5px solid #7367F0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <img src="/images/payments/roket.png" alt="Standard Plans" />

        <Typography variant='h6' sx={{ mb: 2.75 }}>
          Premium
        </Typography>
        <Typography variant='body2' sx={{ mb: 6 }}>
          For large businesses
        </Typography>
        <Typography variant='h4' sx={{ mb: 2.75, fontWeight: 'bold' }}>
          Coming Soon
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PricingPremium;