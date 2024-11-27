import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
}));

export const SubmitButton = styled(Button)(() => ({
  alignSelf: 'flex-end',
}));
