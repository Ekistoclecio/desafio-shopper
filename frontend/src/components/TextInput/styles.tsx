import { FormControl, InputBase, InputLabel } from '@mui/material';
import { alpha, styled } from '@mui/system';

export const Container = styled(FormControl)(() => ({}));

export const Label = styled(InputLabel)(() => ({
  fontSize: '1.8rem',
  fontWeight: 500,
}));

export const CustomInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: '24px',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 16,
    padding: '8px 12px',

    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
