import React from 'react';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from '@/src/@core/utils/get-initials';
import CustomChip from 'src/@core/components/mui/chip'
import { ThemeColor } from 'src/@core/layouts/types'

const statusColors: ColorsType = {
  Active: 'success',
  Inactive: 'secondary'
}

interface ColorsType {
  [key: string]: ThemeColor
}

const DetailMember = ({ data }: any) => {
  return (
    <>
      <Grid item xs={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card style={{ height: '320px' }}>
              <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {data?.avatar ? (
                  <CustomAvatar
                    src={data?.avatar}
                    variant='rounded'
                    alt={data?.fullName}
                    sx={{ width: 120, height: 120, mb: 4 }}
                  />
                ) : (
                  <CustomAvatar
                    skin='light'
                    variant='rounded'

                    // color={data?.avatarColor as ThemeColor}
                    sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                  >
                    {getInitials(data?.fullName)}
                  </CustomAvatar>
                )}
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {data?.fullName}
                </Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='medium'
                  label={`ID Member: ${data?.nik}`}
                  color={'secondary'}
                  sx={{ textTransform: 'capitalize' }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card style={{ height: '320px' }}>
              <Typography variant='h5' sx={{ textAlign: 'center', padding: 5, fontWeight: 700 }}>
                Identity Member
              </Typography>
              <Divider sx={{ my: '0 !important', mx: 6 }} />
              <CardContent sx={{ pb: 4 }}>
                <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  {/* <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500 }}>Department:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.department}</Typography>
                  </Box> */}
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500 }}>Role:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data?.role}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500 }}>Status:</Typography>
                    <CustomChip
                      rounded
                      skin='light'
                      size='small'
                      label={data?.statuses[0].type}
                      color={statusColors[data?.statuses[0].type]}
                      sx={{
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                  {/* <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500 }}>Room Access:</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data.roomAccess}</Typography>
                  </Box> */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card style={{ height: '320px' }}>
              <Typography variant='h5' sx={{ fontWeight: 700, textAlign: 'center', padding: 5 }}>
                Contact Member
              </Typography>
              <Divider sx={{ my: '0 !important', mx: 6 }} />
              <CardContent sx={{ pb: 4 }}>
                <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500 }}>Email:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500 }}>Phone:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.phone}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid> */}
    </>
  );
};

export default DetailMember;
