import { Box, styled } from '@mui/material';

export const Content = styled(Box)(() => ({
  display: 'flex',
  gap: '0.8rem',
  marginBottom: '0.8rem',
}));

export const HistoryContainer = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  maxHeight: 'calc(95vh - 24rem)',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px',
  padding: '0.4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
}));

export const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px',
  maxHeight: 'calc(95vh - 24rem)',
}));
