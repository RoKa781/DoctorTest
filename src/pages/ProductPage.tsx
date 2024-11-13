import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Grid2,
} from '@mui/material';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import { useDispatch, useSelector } from '@/app/store/store';
import { fetchProduct } from '@/features/productFeature/productSlice';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const status = useSelector((state) => state.product.status);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  const backHandler = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={backHandler}
        >
          Назад
        </Button>

        {status === 'loading' ? (
          <CircularProgress color="success" size={250} />
        ) : product ? (
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                />
              </Card>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <CardContent>
                <Typography variant="h2" color="secondary">
                  {product.name}
                </Typography>
                {[
                  { label: 'Статус', value: product.status },
                  { label: 'Вид', value: product.species },
                  { label: 'Тип', value: product.type },
                  { label: 'Пол', value: product.gender },
                  { label: 'Локация', value: product.location.name },
                  {
                    label: 'Создан',
                    value: new Date(product.created).toLocaleDateString(
                      'ru-RU',
                    ),
                  },
                ].map(({ label, value }, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    color="secondary"
                    sx={{ fontSize: '16px', mb: 1 }}
                  >
                    <strong>{label}: </strong>
                    {value}
                  </Typography>
                ))}
              </CardContent>
            </Grid2>
          </Grid2>
        ) : (
          <Typography variant="h6">Продукт не найден</Typography>
        )}
      </Container>
    </AppLayout>
  );
};

export default ProductPage;
