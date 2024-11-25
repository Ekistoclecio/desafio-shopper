import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';
import { styled } from '@mui/system';
import MUIPaper, { PaperProps } from '@mui/material/Paper';

export const Container = styled(Box)<BoxProps>(() => ({
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url(/images/background.jpeg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Paper = styled(MUIPaper)<PaperProps>(() => ({
  width: '720px',
  maxWidth: '95vw',
  maxHeight: '95vh',
  padding: '16px',
}));
