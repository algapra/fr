// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { useAuth } from '@/src/hooks/useAuth'

const AboutProfile = () => {
  const {user} = useAuth()
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                About OWner
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:not(:last-of-type)': { mb: 3 },
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Icon fontSize='1.25rem' icon='tabler:user' />

                <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
                  FullName :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.rawUserMetadata?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:not(:last-of-type)': { mb: 3 },
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Icon fontSize='1.25rem' icon='tabler:crown' />

                <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
                  Role :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.role}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:not(:last-of-type)': { mb: 3 },
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Icon fontSize='1.25rem' icon='tabler:flag' />

                <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
                  Address :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.rawUserMetadata?.address}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Contacts
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:not(:last-of-type)': { mb: 3 },
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Icon fontSize='1.25rem' icon='tabler:phone-call' />

                <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
                  Contact :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.phone}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutProfile
