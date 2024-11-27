import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, AlertProps, SnackbarProps } from '@mui/material';

interface SnackbarMessageOptions extends AlertProps {
  snackbarProps?: Partial<SnackbarProps>;
}

interface SnackbarItem {
  id: number;
  message: string;
  options: SnackbarMessageOptions;
}

interface SnackbarContextType {
  enqueueSnackbar: (message: string, options?: SnackbarMessageOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const enqueueSnackbar = (msg: string, options: SnackbarMessageOptions = {}) => {
    const newSnackbar: SnackbarItem = {
      id: Date.now(),
      message: msg,
      options,
    };
    setSnackbars((prev) => [...prev, newSnackbar]);
  };

  const handleClose = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      {snackbars.map(({ id, message, options }) => (
        <Snackbar
          key={id}
          open
          autoHideDuration={options.snackbarProps?.autoHideDuration || 4000}
          onClose={() => handleClose(id)}
          anchorOrigin={
            options.snackbarProps?.anchorOrigin || {
              vertical: 'bottom',
              horizontal: 'right',
            }
          }
          {...options.snackbarProps}
        >
          <Alert
            onClose={() => handleClose(id)}
            sx={{ width: '100%', ...(options.sx || {}) }}
            {...options}
            variant={options.variant || 'filled'}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
