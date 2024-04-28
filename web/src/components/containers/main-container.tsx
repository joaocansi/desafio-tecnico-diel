import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type ReactNode } from 'react';
import Logo from '../logo';

interface ContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: ContainerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box m={2} maxWidth={1920}>
        <Box component="header">
          <Logo />
        </Box>
        <Box component="main" mt={4}>
          {children}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MainContainer;
