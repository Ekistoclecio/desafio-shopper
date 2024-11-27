import { FormControl, InputBase, InputLabel, Typography } from '@mui/material';
import { alpha, styled } from '@mui/system';

export const Container = styled(FormControl)(() => ({}));

export const Label = styled(InputLabel)(() => ({
  fontSize: '1.8rem',
  fontWeight: 500,
}));

export const CustomInput = styled(InputBase)(({ theme, error }) => ({
  'label + &': {
    marginTop: '24px',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.grey[50],
    border: '1px solid',
    borderColor: error ? theme.palette.error.main : theme.palette.grey[300],
    fontSize: 16,
    padding: '8px 12px',

    '&::placeholder': {
      color: theme.palette.grey[500],
      opacity: 1,
    },

    '&:focus': {
      boxShadow: error
        ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`
        : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    },
  },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  minHeight: '2.0rem',
}));
