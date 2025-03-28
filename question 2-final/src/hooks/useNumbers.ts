import { useQuery } from '@tanstack/react-query';
import { fetchNumbers } from '@/services/api';
import { NumberType, WindowResponse } from '@/types';

export const useNumbersQuery = (numberId: NumberType) => {
  return useQuery<WindowResponse, Error>({
    queryKey: ['numbers', numberId],
    queryFn: () => fetchNumbers(numberId),
    refetchOnWindowFocus: false,
  });
};
