// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import React from 'react'

interface TotalMembersProps {
  dataCount: any;
}

const PastMembers: React.FC<TotalMembersProps> = ({dataCount}) => {
  return (
    <Card>
      <CardContent >
        <CustomAvatar skin='light'variant='rounded' sx={{ mr: 1.5, mb:1.5,backgroundColor: '#f8dedd', padding: '0.5rem', height: 50, width: 50, color: 'red' }}>
          <Icon icon='tabler:user' fontSize='5rem'  />
        </CustomAvatar>
        <Box sx={{ gap: 2, mb: 1.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <Typography sx={{ fontWeight: 600, fontSize: 18}}>Past Member</Typography>
          </div>
        </Box>
        <Box sx={{ mb: 3.5, gap: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                1 month ago
              </Typography>
            </Box>
            <Typography sx={{ mb: 6, color: 'text.secondary' }}>{dataCount} person</Typography>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              {/* <Box sx={{ backgroundColor: '#f0f0f0', padding: '0.5rem', borderRadius: '4px' }}>+25,2%</Box> */}
              <Box sx={{  padding: '1.1rem', borderRadius: '4px' }}></Box>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PastMembers
