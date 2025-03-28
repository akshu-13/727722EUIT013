import axios from 'axios';
import { ApiResponse, WindowResponse, NumberType, NUMBER_TYPE_MAP } from '@/types';

const BASE_URL = 'http://20.244.56.144/test';
const WINDOW_SIZE = 10;
const TIMEOUT = 500;

let numberStore: Record<NumberType, number[]> = {
  p: [],
  f: [],
  e: [],
  r: [],
};

export const fetchNumbers = async (numberId: NumberType): Promise<WindowResponse> => {
  const token = import.meta.env.VITE_API_TOKEN;
  if (!token) {
    throw new Error('VITE_API_TOKEN is not defined in .env');
  }

  const endpoint = NUMBER_TYPE_MAP[numberId];
  const currentWindow = [...(numberStore[numberId] || [])];

  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Authorization ${token}`, // Fixed: Added "Bearer" prefix explicitly
      },
      timeout: TIMEOUT,
    });

    const newNumbers = response.data.numbers;
    const prevWindow = [...currentWindow];

    // Update current window with unique numbers
    const updatedWindow = [...currentWindow, ...newNumbers]
      .filter((num, index, self) => self.indexOf(num) === index)
      .slice(-WINDOW_SIZE);

    // Update store
    numberStore[numberId] = updatedWindow;

    // Calculate average
    const avg = updatedWindow.length > 0
      ? Number((updatedWindow.reduce((a, b) => a + b, 0) / updatedWindow.length).toFixed(2))
      : 0;

    return {
      windowPrevState: prevWindow,
      windowCurrState: updatedWindow,
      numbers: newNumbers,
      avg,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error fetching ${endpoint} numbers:`, errorMessage);
    throw new Error(`Failed to fetch ${endpoint} numbers: ${errorMessage}`);
  }
};
