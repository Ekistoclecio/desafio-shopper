import { Providers } from '@/providers';
import { AppRoutes } from '@/routes/index.tsx';

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
