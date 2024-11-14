import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import store from '@/app/store/store';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2C365E',
      light: '#484D6D',
      dark: '#2B193D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4B8F8C',
      light: '#C5979D',
      dark: '#2B193D',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: `'Oswald', sans-serif`,
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        basename="/DoctorTest"
      >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
