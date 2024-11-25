import { Layout } from '@/components/Layout';
import { DriverSelect } from '@/pages/DriverSelect';
import { History } from '@/pages/History';
import { Home } from '@/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="driver-select" element={<DriverSelect />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
