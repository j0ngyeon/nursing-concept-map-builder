import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY } from '../lib/constants';
import { SAMPLE_MAPS } from '../data/sampleData';

function loadInitialMaps() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('컨셉맵을 불러오는 중 오류가 발생했습니다.', err);
  }
  return SAMPLE_MAPS;
}

export function useConceptMaps() {
  const [maps, setMaps] = useState(loadInitialMaps);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
  }, [maps]);

  const saveMap = useCallback((map) => {
    setMaps((prev) => {
      const exists = prev.some((m) => m.id === map.id);
      if (exists) {
        return prev.map((m) => (m.id === map.id ? map : m));
      }
      return [map, ...prev];
    });
  }, []);

  const deleteMap = useCallback((id) => {
    setMaps((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setMaps((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m))
    );
  }, []);

  return { maps, saveMap, deleteMap, toggleFavorite };
}
