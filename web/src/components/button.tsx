import { type ButtonProps, Button as MuiButton } from '@mui/material';

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <MuiButton size="large" variant="contained" fullWidth={true} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
