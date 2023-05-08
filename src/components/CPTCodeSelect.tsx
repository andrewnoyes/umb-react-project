import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Fragment } from 'react';
import { CPTCode } from '../ApiClient';

export interface CPTCodeSelectProps {
  cptCodes: CPTCode[];
  selected?: CPTCode;
  onSelect: (cptCode?: CPTCode) => void;
}

export const CPTCodeSelect = (props: CPTCodeSelectProps) => {
  const { cptCodes, selected, onSelect } = props;

  const handleChange = (event: SelectChangeEvent) => {
    const code = event.target.value;
    const selectedCpt = cptCodes.find((cptCode) => cptCode.code === code);
    onSelect(selectedCpt);
  };

  return (
    <Fragment>
      <InputLabel id="cpt-code-select-label">CPT Code</InputLabel>
      <Select
        labelId="cpt-code-select-label"
        id="cpt-code-select"
        label="CPT Code"
        value={selected?.code ?? ''}
        onChange={handleChange}
      >
        {cptCodes.map((cptCode) => (
          <MenuItem key={cptCode.id} value={cptCode.code}>
            {cptCode.code}
          </MenuItem>
        ))}
      </Select>
    </Fragment>
  );
};
