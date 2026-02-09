import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedWatchlist = window.localStorage.getItem(key);
    return storedWatchlist ? JSON.parse(storedWatchlist) : initialState;
  });

  useEffect(
    function () {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
