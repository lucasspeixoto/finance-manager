import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type LoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  type: string;
  label: string;
  icon: ReactNode;
  disabled: boolean;
  authProcessHandler?: () => void;
};

const LoginButton = styled(Button)(
  ({ theme }) => `
		font-size: 15px;
		background: ${theme.colors.primary.main};
		color: ${theme.palette.primary.contrastText};
		box-shadow: ${theme.colors.shadows.primary};
		&:hover {
			background: ${theme.colors.primary.dark};
		}
`,
);

const AuthButton: React.FC<LoginButtonProps> = ({
  type,
  label,
  icon,
  disabled,
  authProcessHandler,
}) => {
  return (
    <LoginButton
      disabled={disabled}
      type={type}
      fullWidth
      variant="contained"
      endIcon={icon}
      sx={{ mt: 2, mb: 2 }}
      onClick={authProcessHandler}
    >
      {label}
    </LoginButton>
  );
};

export default AuthButton;
