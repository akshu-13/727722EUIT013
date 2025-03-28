import axios from 'axios';
import { NumberType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

interface NumberDisplayProps {
  numberId: NumberType;
}

const BASE_URL = 'http://20.244.56.144/test';
const WINDOW_SIZE = 10;
const TIMEOUT = 500;

const ENDPOINTS: Record<NumberType, string> = {
  p: `${BASE_URL}/primes`,
  f: `${BASE_URL}/fibo`,
  e: `${BASE_URL}/even`,
  r: `${BASE_URL}/rand`,
};

let numberStore: Record<NumberType, number[]> = {
  p: [],
  f: [],
  e: [],
  r: [],
};

interface ApiResponse {
  numbers: number[];
}

interface WindowResponse {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

export function NumberDisplay({ numberId }: NumberDisplayProps) {
  const fetchNumbers = async (): Promise<WindowResponse> => {
    const token = import.meta.env.VITE_API_TOKEN;

    if (!token) {
      throw new Error('VITE_API_TOKEN is not defined in .env');
    }

    const url = ENDPOINTS[numberId];
    const currentWindow = [...(numberStore[numberId] || [])];

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      timeout: TIMEOUT,
    };


    try {
      const response = await axios.get<ApiResponse>(url, config);

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
        console.error('Error response:', error.response.status, error.response.data);
        throw new Error(error.response.data.message || 'Request failed');
      }
      console.error('Network error:', error);
      throw new Error('Network error');
    }
  };

  const query = useQuery<WindowResponse, Error>({
    queryKey: ['numbers', numberId],
    queryFn: fetchNumbers,
    refetchOnWindowFocus: false,
  });

  const { data, refetch, isLoading, error } = query;

  if (data && data.numbers.length > 0) {
    toast.success('Numbers fetched successfully!', { duration: 3000 });
  }
  if (error) {
    toast.error(error.message, { duration: 4000 });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Number Window States</span>
          <Button onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}
        {data && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Previous Window State:</h3>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(data.windowPrevState, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold">Current Window State:</h3>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(data.windowCurrState, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold">Received Numbers:</h3>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(data.numbers, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold">Average:</h3>
              <p className="bg-gray-100 p-2 rounded">{data.avg}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
