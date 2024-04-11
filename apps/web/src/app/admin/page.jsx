// pages/index.js
import Typography from '@mui/material/Typography';
import DashboardContent from '@/components/admin/DashboardContent';

export default function Home() {
  return (
    <Typography paragraph>
      <DashboardContent />
    </Typography>
  );
}
