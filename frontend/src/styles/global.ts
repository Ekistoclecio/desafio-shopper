import { Theme } from '@mui/material/styles';

export const globalStyle = (theme: Theme) => ({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  body: {
    backgroundColor: theme.palette.background.default,
    WebkitFontSmoothing: 'antialiased',
  },
});
