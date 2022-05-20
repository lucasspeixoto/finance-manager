import {
  FormControlLabel,
  FormGroup,
  Switch as MUISwitch,
  SwitchProps,
} from '@mui/material';
import React from 'react';

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MUISwitch
            sx={{ m: 1 }}
            inputProps={{ 'aria-label': 'controlled' }}
            checked={checked}
            onChange={onChange}
          />
        }
        label=""
      />
    </FormGroup>
  );
};

export default Switch;
