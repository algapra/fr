// ** MUI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Types
import { useAuth } from '@/src/hooks/useAuth';
import { getInitials } from '@/src/@core/utils/get-initials';

const renderClient = (name: string) => {
  return (
    <CustomAvatar
      skin='filled'
      variant='square'
      color='primary'
      sx={{
        mr: 3,
        fontSize: '3rem',
        width: 108,
        height: 108,
      }}
    >
      {getInitials(name ? name.toUpperCase() : 'John Doe').slice(0, 2)}
    </CustomAvatar>
  );
};

const UserProfileHeader = () => {
  const { user } = useAuth();

  const formatDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', options);
  };

  return user !== null ? (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image={'/images/pages/profile-banner.png'}
        sx={{
          height: { xs: 150, md: 250 },
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {renderClient(user.rawUserMetadata.name)}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between'],
          }}
        >
          <Box
            sx={{
              mb: [6, 0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: ['center', 'flex-start'],
            }}
          >
            <Typography variant='h6' sx={{ mb: 2.5 }}>
              {user.rawUserMetadata.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start'],
              }}
            >
              <Box
                sx={{
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize='1.25rem' icon='tabler:briefcase' />
                <Typography sx={{ color: 'text.secondary' }}>
                  {user.company.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize='1.25rem' icon='tabler:map-pin' />
                <Typography sx={{ color: 'text.secondary' }}>
                  {user?.rawUserMetadata?.address}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize='1.25rem' icon='tabler:calendar' />
                <Typography sx={{ color: 'text.secondary' }}>
                  Joined {formatDate(user.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  ) : null;
};

export default UserProfileHeader;
