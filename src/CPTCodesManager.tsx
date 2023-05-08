import { Box, Container, FormControl, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CPTCode, CreateCPTCodeCost, apiClient } from './ApiClient';
import { CPTCodeCostFrom, CPTCodeSelect, StatsCard } from './components';

export const CPTCodesManager = () => {
  const [cptCodes, setCptCodes] = useState<CPTCode[]>([]);
  const [selectedCode, setSelectedCode] = useState<CPTCode | undefined>();
  const [averageCost, setAverageCost] = useState<number | undefined>();

  const loadCodes = async () => {
    const codes = await apiClient.listCptCodes();

    setCptCodes(codes);
  };

  const loadAverageCost = async (codeId: number) => {
    const costs = await apiClient.listCptCodeCosts(codeId);
    const costSum = costs.reduce((acc, cptCost) => acc + cptCost.cost, 0);
    const avgCost = costSum / costs.length;

    setAverageCost(avgCost);
  };

  const handleSaveCost = async (newCost: CreateCPTCodeCost) => {
    if (!selectedCode) {
      return;
    }

    await apiClient.createCptCodeCost(selectedCode.id, newCost);
    await loadAverageCost(selectedCode.id);
  };

  useEffect(() => {
    loadCodes();
  }, []);

  useEffect(() => {
    if (selectedCode) {
      loadAverageCost(selectedCode.id);
    }
  }, [selectedCode]);

  return (
    <Container maxWidth="sm">
      <FormControl fullWidth>
        <CPTCodeSelect
          cptCodes={cptCodes}
          selected={selectedCode}
          onSelect={(cptCode) => setSelectedCode(cptCode)}
        />
      </FormControl>
      {selectedCode ? (
        <Stack mt={2} spacing={2}>
          <StatsCard
            label="Average Cost"
            value={averageCost ? `$ ${averageCost.toFixed(2)}` : 'N/A'}
          />
          <CPTCodeCostFrom onSave={handleSaveCost} />
        </Stack>
      ) : (
        <Box mt={1}>
          <Typography variant="caption">
            Select a CPT Code to view its average cost and add new costs
          </Typography>
        </Box>
      )}
    </Container>
  );
};
