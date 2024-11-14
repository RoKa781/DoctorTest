import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  SelectChangeEvent,
  Grid2,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '@/types';

const FilterControls = () => {
  const [filters, setFilters] = useState<Filters>({
    status: '',
    species: '',
    type: '',
    gender: '',
    favorite: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get('status') || '';
    const species = searchParams.get('species') || '';
    const type = searchParams.get('type') || '';
    const gender = searchParams.get('gender') || '';
    const favorite = searchParams.get('favorite') === 'true';

    setFilters({
      status,
      species,
      type,
      gender,
      favorite,
    });
  }, [searchParams]);

  const handleFilterChange = (
    event:
      | React.ChangeEvent<{ name?: string; value: unknown }>
      | SelectChangeEvent<string>,
  ) => {
    const { name, value } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    if (name === 'favorite') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name as keyof Filters]: checked,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name as keyof Filters]: value,
      }));
    }
  };

  const applyFilters = () => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchParams('');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{ backgroundColor: 'white', padding: 2, borderRadius: '8px' }}
    >
      <Grid2 container spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              label="Status"
            >
              <MenuItem value="alive">Alive</MenuItem>
              <MenuItem value="dead">Dead</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Species</InputLabel>
            <Select
              name="species"
              value={filters.species}
              onChange={handleFilterChange}
              label="Species"
            >
              <MenuItem value="human">Human</MenuItem>
              <MenuItem value="alien">Alien</MenuItem>
              <MenuItem value="Humanoid">Humanoid</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              label="Type"
            >
              <MenuItem value="Superhuman">Superhuman</MenuItem>
              <MenuItem value="Fish-Person">Fish-Person</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              label="Gender"
            >
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="genderless">Genderless</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>

      <FormControlLabel
        control={
          <Checkbox
            name="favorite"
            checked={Boolean(filters.favorite)}
            onChange={handleFilterChange}
          />
        }
        label="Избранное"
      />

      <Box display="flex" gap={2} justifyContent="flex-start" flexWrap="wrap">
        <Button variant="contained" onClick={applyFilters}>
          Применить фильтры
        </Button>
        <Button variant="outlined" color="secondary" onClick={resetFilters}>
          Сбросить фильтры
        </Button>
      </Box>
    </Box>
  );
};

export default FilterControls;
