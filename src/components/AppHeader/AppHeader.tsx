import {
  AppBar,
  Typography,
  Container,
} from '@mui/material';

const AppHeader = () => {
  return (
    <AppBar color='primary' position="static" sx={{ maxWidth: '1440px', margin: '0 auto' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          DoctorTest
        </Typography>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
