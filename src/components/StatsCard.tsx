import { Paper, Typography } from '@mui/material';

export interface StatsCardProps {
  label: string;
  value: string;
}

export const StatsCard = (props: StatsCardProps) => {
  const { label, value } = props;

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="caption">{label}</Typography>
      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </Paper>
  );
};
