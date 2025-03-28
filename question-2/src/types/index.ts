export interface ApiResponse {
  numbers: number[];
}

export interface WindowResponse {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

export type NumberType = 'p' | 'f' | 'e' | 'r';

export const NUMBER_TYPE_MAP: Record<NumberType, string> = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand',
};

export const NUMBER_TYPE_LABELS: Record<NumberType, string> = {
  p: 'Prime',
  f: 'Fibonacci',
  e: 'Even',
  r: 'Random',
};
