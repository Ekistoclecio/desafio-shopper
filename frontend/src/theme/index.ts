import { buttonStyles } from '@/theme/components/button';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#b2cce8',
      main: '#0056B4',
      dark: '#003c7e',
    },

    grey: {
      50: '#f2f2f2',
      100: '#e6e6e6',
      200: '#cccccc',
      300: '#b2b2b2',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4c4c4c',
      800: '#333333',
      900: '#1a1a1a',
    },
  },

  components: {
    MuiButton: buttonStyles,
  },
});
