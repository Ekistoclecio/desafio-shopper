import { Box, InputLabel, InputLabelProps, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

type LabelProps = InputLabelProps & { selectOpen: boolean };

export const Label = styled(InputLabel, {
  shouldForwardProp: (prop) => prop !== 'selectOpen',
})<LabelProps>(({ theme, selectOpen }) => ({
  fontSize: '1.8rem',
  fontWeight: 500,
  marginBottom: '-2px',

  color: selectOpen ? theme.palette.primary.main : theme.palette.grey[500],
}));

export const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.grey[50],

    border: '1px solid',
    borderColor: theme.palette.grey[300],
    fontSize: '16px',
    lineHeight: '22px',
    padding: '8px 12px',
    outline: 'none !important',
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px !important',
  },
}));

export const CustomMenuItem = styled(MenuItem)(() => ({
  fontSize: '1.6rem',
}));
