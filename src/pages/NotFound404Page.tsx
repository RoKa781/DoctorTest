import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';

const NotFoundPage = () => {
  return (
    <AppLayout>
      <Button variant="contained" size="large" color="secondary">
        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
          На главную
        </Link>
      </Button>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <RunningWithErrorsIcon color="secondary" sx={{ fontSize: '250px' }} />
        <Typography variant="h2" color="secondary">
          Страница не найдена
        </Typography>
      </Box>
    </AppLayout>
  );
};

export default NotFoundPage;
