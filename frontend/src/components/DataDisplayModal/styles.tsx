import { Box, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '95%',
  padding: '8px',
}));

export const Title = styled(Typography)(({ theme }) => ({
  lineHeight: '3rem',
  fontWeight: '500',
  color: theme.palette.grey[700],
}));

export const Content = styled(Box)(() => ({
  marginTop: '0.8rem',
}));

export const CloseButton = styled(Button)(() => ({
  alignSelf: 'flex-end',
}));
