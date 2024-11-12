import { CircularProgress, Pagination, Box } from '@mui/material';
import { useEffect } from 'react';
import AppLayout from '@/app/AppLayout';
import { RootState, useDispatch, useSelector } from '@/app/store/store';
import CardList from '@/features/cardsFeature/CardList';
import { fetchCharacters } from '@/features/cardsFeature/cardsSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const { characters, status, error } = useSelector(
    (state: RootState) => state.cards,
  );

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <AppLayout>
      {status === 'loading' && <CircularProgress size={250} />}
      <CardList characters={characters} />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
      >
        <Pagination
          count={10}
          color="secondary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
              fontSize: '20px',
            },
            padding: '20px',
          }}
        />
      </Box>
    </AppLayout>
  );
};

export default MainPage;
