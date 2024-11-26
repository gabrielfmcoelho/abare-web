// src/hooks/useTraits.ts

import { useFetchWithFallback } from './useFetchWithFallback';
import { Trait } from '@/types';
import { traits as staticTraits } from '@/data/traits';

export const useTraits = () => {
  const apiURL = 'https://external-api.com/traits'; // Replace with your actual API endpoint

  return useFetchWithFallback<Trait>(
    ['traits'],
    apiURL,
    staticTraits
  );
};
