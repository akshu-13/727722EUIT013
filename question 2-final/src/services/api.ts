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
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': '*/*',
        'Host': '20.244.56.144',
      },
      timeout: TIMEOUT,
    };

    console.log('Sending request with config:', config); // Debug

    const response = await axios.get<ApiResponse>(`${BASE_URL}/${endpoint}`, config);
    console.log('Response received:', response.status, response.data); // Debug

    const newNumbers = response.data.numbers;
    const prevWindow = [...currentWindow];

    const updatedWindow = [...currentWindow, ...newNumbers]
      .filter((num, index, self) => self.indexOf(num) === index)
      .slice(-WINDOW_SIZE);

    numberStore[numberId] = updatedWindow;

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
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error fetching ${endpoint}:`, error.response.status, error.response.data);
      throw new Error(`${error.response.data.message || 'Request failed'}`);
    } else {
      console.error(`Error fetching ${endpoint}:`, error);
      throw new Error('Network error');
    }
  }
};
