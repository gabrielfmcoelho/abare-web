// src/hooks/useDiaries.ts

import { useFetchWithFallback } from './useFetchWithFallback';
import { Diary } from '@/types';
import { diaries as staticDiaries } from '@/data/diaries';

export const useDiaries = () => {
  const apiURL = 'https://external-api.com/diaries'; // Replace with your actual API endpoint

  return useFetchWithFallback<Diary[]>(
    ['diaries'],
    apiURL,
    staticDiaries
  );
};
