import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import { addProduct } from '@/features/cardsFeature/cardsSlice';
import { validateProductForm, ProductFormData } from '@/utils/validation';

const AddProductPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    species: '',
    price: '',
    image: '',
  });

  const [errors, setErrors] = useState<Record<keyof ProductFormData, string>>({
    name: '',
    species: '',
    price: '',
    image: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    const formIsValid = Object.values(validationErrors).every(
      (error) => error === '',
    );

    if (formIsValid) {
      dispatch(
        addProduct({
          id: nanoid(),
          name: formData.name,
          species: formData.species,
          price: parseFloat(formData.price),
          image: formData.image,
        }),
      );

      setSuccessMessage('Продукт успешно добавлен!');
      setFormData({ name: '', species: '', price: '', image: '' });
      setErrors({ name: '', species: '', price: '', image: '' });
    }
  };

  const backHandler = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <AppLayout>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        sx={{ mb: 2 }}
        onClick={backHandler}
      >
        Назад
      </Button>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h3" gutterBottom color="secondary">
          Создать продукт
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            color="secondary"
            label="Название продукта"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            color="secondary"
            label="Описание продукта"
            name="species"
            value={formData.species}
            onChange={handleChange}
            error={Boolean(errors.species)}
            helperText={errors.species}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            color="secondary"
            label="Изображение"
            name="image"
            value={formData.image}
            onChange={handleChange}
            error={Boolean(errors.image)}
            helperText={errors.image}
            sx={{ mb: 2 }}
          />

          <TextField
            color="secondary"
            fullWidth
            label="Цена продукта"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={Boolean(errors.price)}
            helperText={errors.price}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Добавить продукт
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
};

export default AddProductPage;
