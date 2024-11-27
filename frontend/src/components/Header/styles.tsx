import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router';

export const Container = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2.4rem',
}));

export const TitleContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  height: '3rem',
  minHeight: 'fit-content',
}));

export const Title = styled(Typography)(({ theme }) => ({
  lineHeight: '3rem',
  fontWeight: '500',
  color: theme.palette.grey[700],
}));

export const Line = styled(Box)(({ theme }) => ({
  width: '4px',
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  marginRight: '0.8rem',
}));

export const Nav = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
}));

export const NavItem = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.grey[500],
  '& svg': {
    fontSize: '2.4rem',
  },

  '&.active': {
    color: theme.palette.primary.main,
  },
}));
