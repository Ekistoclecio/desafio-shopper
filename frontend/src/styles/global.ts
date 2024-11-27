import { Theme } from '@mui/material/styles';

export const globalStyle = (theme: Theme) => ({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,

    '&::-webkit-scrollbar': {
      width: '5px',
      backgroundColor: theme.palette.grey[100],
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[500],
      borderRadius: '24px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.palette.grey[700],
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[200],
      borderRadius: '24px',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: theme.palette.grey[300],
    },
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },
  },
  html: {
    fontSize: '62.5%',
  },
  body: {
    backgroundColor: theme.palette.background.default,
    WebkitFontSmoothing: 'antialiased',
  },
});
