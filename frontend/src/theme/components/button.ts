import { ComponentsOverrides, Theme } from '@mui/material';

export const buttonStyles: {
  styleOverrides: ComponentsOverrides<Theme>['MuiButton'];
} = {
  styleOverrides: {
    root: {
      fontSize: '1.4rem',
      padding: '0.4rem 0.8rem',
      textTransform: 'none',
    },
  },
};
