import { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('haven-favs') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => localStorage.setItem('haven-favs', JSON.stringify(favorites)), [favorites]);

  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  return <StoreContext.Provider value={{ favorites, toggleFavorite }}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
