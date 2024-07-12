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

const AboutCompany = () => {
  const {user} = useAuth()
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                About Company
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
                  Name :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.company?.name}
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
                  Field :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.company.field}
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
                  Type :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.company?.type}
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
                  Plan :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.company?.plan}
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
                  Total Max Member :
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.company?.memberCount}
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
                  {user?.company.phone}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutCompany
