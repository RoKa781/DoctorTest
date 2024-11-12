import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { TCharacter } from '@/types';

interface CardItemProps {
  character: TCharacter;
  onLike: () => void;
  onDelete: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ character, onLike, onDelete }) => {
  return (
    <Link to={`/${character.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
          <IconButton onClick={onLike} color="default">
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={onDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </Link>
  );
};

export default CardItem;
