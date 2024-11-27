import { Box, Typography } from '@mui/material';
import { lighten, styled } from '@mui/system';
import MUISubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import MUICalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const Container = styled(Box)(() => ({
  padding: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  border: '1px solid #e0e0e0',
  borderRadius: '0.8rem',
}));

export const SubdirectoryArrowRightIcon = styled(MUISubdirectoryArrowRightIcon)(({ theme }) => ({
  width: '2.4rem',
  height: '2.4rem',
  fill: theme.palette.primary.main,
  marginTop: '-0.8rem',
}));

export const HeaderContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const DateContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
}));

export const PrimaryText = styled(Typography)(() => ({
  fontSize: '1.6rem',
  fontWeight: 'bold',
}));

export const SecondaryText = styled(Typography)(() => ({
  fontSize: '1.2rem',
}));

export const DestinationContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const InfoContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const InfoItem = styled(Box)(({ theme }) => ({
  borderRadius: '1.6rem',
  padding: '0.4rem 0.8rem',
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.main, 0.8),
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
}));

export const CalendarMonthIcon = styled(MUICalendarMonthIcon)(({ theme }) => ({
  marginTop: '-0.2rem',
  fill: theme.palette.primary.main,
}));
