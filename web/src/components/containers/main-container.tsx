import { Box, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type ReactNode } from 'react';
import Logo from '../logo';
import Link from 'next/link';
import Button from '../button';

interface ContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: ContainerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={2} maxWidth={1920} marginX="auto">
        <Grid container component="header">
          <Grid item xs={12} sm={8}>
            <Logo />
          </Grid>
          <Grid
            item
            component="nav"
            xs={12}
            sm={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right',
              gap: 2,
            }}
          >
            <Link href="/grafico">
              <Typography>Análise das Tarefas</Typography>
            </Link>
            <Button variant="contained" sx={{ width: 175 }}>
              Deslogar
            </Button>
          </Grid>
        </Grid>
        <Box component="main" mt={4}>
          {children}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MainContainer;
