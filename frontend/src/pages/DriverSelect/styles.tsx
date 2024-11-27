import { Box, Button, styled } from '@mui/material';

export const SelectRideContainer = styled(Box)(({ theme }) => ({
  marginTop: '1.6rem',
  overflowY: 'auto',
  maxHeight: 'calc(95vh - 44rem)',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px',
  padding: '0.4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
}));

export const Content = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
}));

export const MapContainer = styled(Box)(() => ({ width: '100%', height: '300px', borderRadius: '8px' }));

export const BackButton = styled(Button)(() => ({
  alignSelf: 'flex-start',
}));
