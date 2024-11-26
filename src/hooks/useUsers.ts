// src/hooks/useUsers.ts

import { useFetchWithFallback } from './useFetchWithFallback';
import { User } from '@/types';
import { users as staticUsers } from '@/data/users';

export const useUsers = () => {
  const apiURL = 'https://external-api.com/users'; // Replace with your actual API endpoint

  return useFetchWithFallback<User>(
    ['users'],
    apiURL,
    staticUsers
  );
};
