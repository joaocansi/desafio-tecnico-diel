import { Box, type BoxProps } from '@mui/material';
import { type ReactNode } from 'react';

type FlexProps = BoxProps & {
  children: ReactNode;
  column?: boolean;
};

const Flex = ({ children, column, sx, ...props }: FlexProps) => (
  <Box
    {...props}
    sx={{
      display: 'flex',
      flexDirection: column ? 'column' : 'initial',
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default Flex;
