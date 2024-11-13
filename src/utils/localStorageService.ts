export const LocalStorageService = {
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch {
      return [];
    }
  },

  setFavorites: (favorites: string[]) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },

  addToFavorites: (id: string) => {
    const favorites = LocalStorageService.getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      LocalStorageService.setFavorites(favorites);
    }
  },

  removeFromFavorites: (id: string) => {
    const favorites = LocalStorageService.getFavorites().filter(
      (fav: string) => fav !== id,
    );
    LocalStorageService.setFavorites(favorites);
  },
};
