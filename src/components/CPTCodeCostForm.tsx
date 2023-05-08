import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { CreateCPTCodeCost } from '../ApiClient';

const DEFAULT_STATE: CreateCPTCodeCost = {
  cost: 0,
  facilityType: '',
  copay: 0,
};

export interface CPTCodeCostFormProps {
  onSave: (createCost: CreateCPTCodeCost) => void;
}

export const CPTCodeCostFrom = (props: CPTCodeCostFormProps) => {
  const { onSave } = props;
  const [newCost, setNewCost] = useState<CreateCPTCodeCost>(DEFAULT_STATE);

  const handleClear = () => {
    setNewCost(DEFAULT_STATE);
  };

  const handleSave = () => {
    onSave(newCost);
    handleClear();
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" align="left" fontWeight={700} mb={1}>
        Enter a new cost
      </Typography>
      <Stack
        component="form"
        spacing={2}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <TextField
          required
          id="cpt-code-cost"
          label="Cost"
          inputProps={{ inputMode: 'numeric', pattern: `[0-9]*` }}
          value={newCost.cost || ''}
          onChange={(e) =>
            setNewCost({ ...newCost, cost: Number.parseFloat(e.target.value) })
          }
        />
        <TextField
          required
          id="cpt-code-facility-type"
          label="Facility Type"
          value={newCost.facilityType}
          onChange={(e) =>
            setNewCost({ ...newCost, facilityType: e.target.value })
          }
        />
        <TextField
          required
          id="cpt-code-copay"
          label="Copay"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          value={newCost.copay || ''}
          onChange={(e) =>
            setNewCost({ ...newCost, copay: Number.parseFloat(e.target.value) })
          }
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={handleClear}>Clear</Button>
          <Button variant="contained" type="submit">
            Add new cost
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
