import { FormControlLabel, FormGroup, Switch, SwitchProps } from '@mui/material';
import React from 'react';

const AppSwitch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
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

export default AppSwitch;
