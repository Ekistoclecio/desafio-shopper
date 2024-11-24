import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { render, RenderResult } from '@testing-library/react';
import { globalStyle } from '@/styles/global';

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      {children}
    </ThemeProvider>,
  );
