import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxesGroup({ proficiencyState, setProficiencyState }) {
  const handleChange = (event) => {
    setProficiencyState({
      ...[proficiencyState], [event.target.name]: event.target.checked,
    });
  };
  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/ability-scores/')
    .then(r=>r.json())
    .then(a=>console.log(a))
  }, [])
  


  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl
        required
     
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        {/* <FormGroup>
            { proficiencies.map((p)=>
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name={p} />
            }
            label={p}
          />
            )}
        </FormGroup> */}
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </Box>
  );
}