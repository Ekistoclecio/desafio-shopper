import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { render, RenderResult } from '@testing-library/react';
import { globalStyle } from '@/styles/global';
import { MemoryRouter } from 'react-router';

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyle} />
        {children}
      </ThemeProvider>
    </MemoryRouter>,
  );
