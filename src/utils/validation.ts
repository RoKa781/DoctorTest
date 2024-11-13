export type ProductFormData = {
  name: string;
  species: string;
  price: string;
  image: string;
};

export const validateProductForm = (formData: ProductFormData) => {
  const errors: Record<keyof ProductFormData, string> = {
    name: '',
    species: '',
    price: '',
    image: '',
  };

  if (!formData.name.trim()) {
    errors.name = 'Название продукта обязательно';
  } else if (formData.name.length < 3) {
    errors.name = 'Название продукта должно быть не менее 3 символов';
  } else if (/[^a-zA-Z0-9а-яА-Я\s]/.test(formData.name)) {
    errors.name = 'Название продукта может содержать только буквы и пробелы';
  }

  if (!formData.species.trim()) {
    errors.species = 'Описание продукта обязательно';
  } else if (formData.species.length < 10) {
    errors.species = 'Описание продукта должно быть не менее 10 символов';
  } else if (/[^a-zA-Z0-9а-яА-Я\s,.!?-]/.test(formData.species)) {
    errors.species =
      'Описание может содержать только буквы, цифры и стандартные знаки пунктуации';
  }

  if (
    !formData.price ||
    isNaN(Number(formData.price)) ||
    Number(formData.price) <= 0
  ) {
    errors.price = 'Цена должна быть числом и больше нуля';
  } else if (Number(formData.price) > 100000) {
    errors.price = 'Цена не может превышать 100,000';
  } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
    errors.price =
      'Цена должна быть числом с максимум двумя знаками после запятой';
  }

  const imageRegex = /^(https?:\/\/[^\s]+)$/i;
  if (formData.image && !imageRegex.test(formData.image)) {
    errors.image = 'Изображение должно быть валидным URL';
  } else if (
    formData.image &&
    !/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(formData.image)
  ) {
    errors.image =
      'Поддерживаются только изображения в формате JPG, JPEG, PNG, GIF, BMP, WEBP, SVG';
  }

  return errors;
};
