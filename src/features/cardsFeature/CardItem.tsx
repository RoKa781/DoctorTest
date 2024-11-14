import DeleteIcon from '@mui/icons-material/DeleteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from '@/app/store/store';
import { TCharacter } from '@/types';
import { LocalStorageService } from '@/utils/localStorageService';
import { removeProduct } from './cardsSlice';

interface CardItemProps {
  character: TCharacter;
}

const CardItem: React.FC<CardItemProps> = ({ character }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setLiked(favorites.includes(character.id));
  }, [character.id]);

  const handleLikeClick = (event: SyntheticEvent) => {
    event.stopPropagation();

    if (liked) {
      LocalStorageService.removeFromFavorites(character.id);
      setLiked(false);
    } else {
      LocalStorageService.addToFavorites(character.id);
      setLiked(true);
    }
  };

  const handleDeleteClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(removeProduct(character.id));
  };

  return (
    <Card
      sx={{
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Link
        to={`/products/${character.id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <CardMedia
          component="img"
          alt={character.name}
          height="300"
          image={character.image}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {character.species} - {character.status}
          </Typography>
        </CardContent>
      </Link>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
        <IconButton
          onClick={handleLikeClick}
          color={liked ? 'error' : 'default'}
          component="button"
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          onClick={handleDeleteClick}
          color="primary"
          component="button"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default CardItem;
