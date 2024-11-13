import { AppBar, Typography, Container, useTheme, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        maxWidth: '1440px',
        margin: '0 auto',
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          DoctorTest
        </Typography>
        <Link to={'/product-create'} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary" sx={{ mb: 2 }}>
            Создать карточку
          </Button>
        </Link>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
