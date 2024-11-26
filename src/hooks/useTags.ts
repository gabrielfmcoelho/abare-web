// src/hooks/useTags.ts

import { useFetchWithFallback } from './useFetchWithFallback';
import { Tag } from '@/types';
import { tags as staticTags } from '@/data/tags';

export const useTags = () => {
  const apiURL = 'https://external-api.com/tags'; // Replace with your actual API endpoint

  return useFetchWithFallback<Tag>(
    ['tags'],
    apiURL,
    staticTags
  );
};
