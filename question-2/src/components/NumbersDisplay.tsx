import { NumberType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNumbersQuery } from '@/hooks/useNumbers';
import { toast } from 'sonner';

interface NumberDisplayProps {
  numberId: NumberType;
}

export function NumberDisplay({ numberId }: NumberDisplayProps) {
  const query = useNumbersQuery(numberId);
  const { data, refetch, isLoading, error, isSuccess, isError } = query;

  // Handle success and error states with toast
  if (isSuccess && data && data.numbers.length > 0) {
    toast.success('Numbers fetched successfully!', {
      duration: 3000,
    });
  }
  if (isError && error) {
    toast.error(error.message, {
      duration: 4000,
    });
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
        {error && (
          <div className="text-red-500 mb-4">Error: {error.message}</div>
        )}
        
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
