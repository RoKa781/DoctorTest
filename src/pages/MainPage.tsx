import {
  CircularProgress,
  Pagination,
  Box,
  Backdrop,
  useTheme,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import { RootState, useDispatch, useSelector } from '@/app/store/store';
import FilterControls from '@/components/FilterControls/FilterControls';
import CardList from '@/features/cardsFeature/CardList';
import { fetchCharacters } from '@/features/cardsFeature/cardsSlice';
import { Filters } from '@/types';

type MainPageProps = {
  prevPath: string | null;
};

const MainPage: React.FC<MainPageProps> = ({ prevPath }) => {
  const dispatch = useDispatch();
  const { characters, status, error, totalPages } = useSelector(
    (state: RootState) => state.cards,
  );
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );
  const theme = useTheme();

  useEffect(() => {
    const pageFromUrl = searchParams.get('page');
    if (pageFromUrl) {
      setCurrentPage(Number(pageFromUrl));
    }
  }, [searchParams]);

  useEffect(() => {
    const filters: Filters = {
      status: searchParams.get('status') || '',
      species: searchParams.get('species') || '',
      type: searchParams.get('type') || '',
      gender: searchParams.get('gender') || '',
      favorite: searchParams.get('favorite') === 'true',
    };

    if (prevPath !== '/product-create') {
      dispatch(fetchCharacters({ page: currentPage.toString(), filters }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, dispatch]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev.entries()),
      page: value.toString(),
    }));
  };

  return (
    <AppLayout>
      {status === 'loading' && (
        <Backdrop
          open={true}
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        >
          <CircularProgress color="secondary" size={250} />
        </Backdrop>
      )}
      <FilterControls />
      {error && (
        <Alert
          severity="error"
          sx={{
            mt: 3,
            mb: 3,
            textTransform: 'uppercase',
            fontSize: '25px',
            alignItems: 'center',
          }}
        >
          Error: {error}
        </Alert>
      )}
      <CardList
        characters={
          searchParams.get('favorite') === 'true' ? favorites : characters
        }
      />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
      >
        <Pagination
          count={
            searchParams.get('favorite') === 'true'
              ? Math.ceil(favorites.length / 20)
              : totalPages
          }
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
              fontSize: '20px',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            },
            padding: '20px',
          }}
        />
      </Box>
    </AppLayout>
  );
};

export default MainPage;
