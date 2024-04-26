import { ButtonProps, Button as MuiButton } from "@mui/material";

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <MuiButton size="large" variant="contained" {...props}>
      {children}
    </MuiButton>
  )
}

export default Button;