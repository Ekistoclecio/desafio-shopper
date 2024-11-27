import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
  padding: '2.4rem',
}));
