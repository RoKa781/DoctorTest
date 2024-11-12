import { Grid2, List } from '@mui/material';
import { TCharacter } from '@/types';
import CardItem from './CardItem';

interface CardListProps {
  characters: TCharacter[];
}

const CardList: React.FC<CardListProps> = ({ characters }) => {
  return (
    <List>
      <Grid2
        container
        spacing={2}
        sx={{
          backgroundColor: '#f0e7e6',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        {characters.map((character) => (
          <Grid2
            size={{ xs: 12, sm: 6, md: 4, xl: 3 }}
            key={character.id}
            component="article"
          >
            <CardItem
              onLike={() => {}}
              onDelete={() => {}}
              character={character}
            />
          </Grid2>
        ))}
      </Grid2>
    </List>
  );
};

export default CardList;
