// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import { List, ListItem, ListItemAvatar, ListItemText, SvgIcon } from '@mui/material'

function CircleIcon(props:any) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(100, 100, 100, 0.5)" strokeWidth="3" />
    </SvgIcon>
  );
}
const SubscriptionStandard = () => {
  return (
    <Card sx={{ height: 480, border: '1.5px solid #7367F0', }}>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <img src="/images/payments/standard.png" alt="Standard Plans" />
        <Typography variant='h6' sx={{ mb: 2 }}>
          Standard
        </Typography>
        <Typography variant='body2' sx={{ mb: 2 }}>
          For small to medium businesses
        </Typography>
        <Typography variant='body2' sx={{ color: '#7367F0'}}>
          Rp <span style={{ fontSize: '3.5rem' }}>50.000</span> <span style={{ color: 'gray' }}>/member/month</span>
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          <ListItem disablePadding>
            <ListItemAvatar>
              <CircleIcon sx={{ width: 20, height: 20 }} />
            </ListItemAvatar>
            <ListItemText primary="Unlimited Face Scan" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemAvatar>
              <CircleIcon sx={{ width: 20, height: 20 }} />
            </ListItemAvatar>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemAvatar>
              <CircleIcon sx={{ width: 20, height: 20 }} />
            </ListItemAvatar>
            <ListItemText primary="Manage Member Access" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemAvatar>
              <CircleIcon sx={{ width: 20, height: 20 }} />
            </ListItemAvatar>
            <ListItemText primary="Track Member Present" />
          </ListItem>
        </List>
       </CardContent>
    </Card>
  )
}

export default SubscriptionStandard
