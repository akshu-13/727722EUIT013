import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Toaster } from 'sonner';
import { NumberDisplay } from './components/NumbersDisplay';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-center">
                Average Calculator Microservice
              </h1>
              <Routes>
                <Route path="/numbers/p" element={<NumberDisplay numberId="p" />} />
                <Route path="/numbers/f" element={<NumberDisplay numberId="f" />} />
                <Route path="/numbers/e" element={<NumberDisplay numberId="e" />} />
                <Route path="/numbers/r" element={<NumberDisplay numberId="r" />} />
                <Route path="/" element={<NumberDisplay numberId="e" />} />
              </Routes>
            </div>
          </div>
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
