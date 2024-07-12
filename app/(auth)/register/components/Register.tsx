'use client';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { CardContent } from '@mui/material';
import { Content } from './Content';

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750,
  },
}));

export const Register = () => {
  return (
    <Box
      className='content-right'
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <RightWrapper sx={{ padding: [6, 12] }}>
        <Box
          sx={{
            p: [6, 6],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 24,
            justifyContent: 'center',
          }}
        >
          <CardContent sx={{ mt: 4 }}>
            <Content />
          </CardContent>
        </Box>
      </RightWrapper>
    </Box>
  );
};
