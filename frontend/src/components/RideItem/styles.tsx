import { Box, Typography } from '@mui/material';
import { lighten, styled } from '@mui/system';
import MUIInfoIcon from '@mui/icons-material/Info';
import MUITooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export const Container = styled(Box)(() => ({
  padding: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  border: '1px solid #e0e0e0',
  borderRadius: '0.8rem',
}));

export const HeaderContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const PrimaryText = styled(Typography)(() => ({
  fontSize: '1.6rem',
  fontWeight: 'bold',
}));

export const SecondaryText = styled(Typography)(() => ({
  fontSize: '1.2rem',
}));

export const FooterContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
}));

export const DriverInfoContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const InfoIcon = styled(MUIInfoIcon)(({ theme }) => ({
  width: '1.6rem',
  height: '1.6rem',
  fill: theme.palette.primary.main,
}));

export const InfoItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
}));

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: lighten(theme.palette.primary.main, 0.8),
    border: `1px solid ${theme.palette.primary.main}`,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 11,
  },
}));

export const TooltipHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const TooltipContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
}));
