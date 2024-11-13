export type TCharacter = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: string;
  location: {
    name: string;
  };
};

export type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type Filters = {
  status: string;
  species: string;
  type: string;
  gender: string;
  favorite: boolean;
};
