import { SnackbarProvider } from '@/providers/Snackbar';
import { globalStyle } from '@/styles/global';
import { theme } from '@/theme';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  );
};
