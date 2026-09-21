import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import RegistroCampersPage from './pages/RegistroCampersPage';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/registro" />} />
          <Route path="/registro" element={<RegistroCampersPage />} />
          <Route path="/consultar" element={<div style={{color: 'white'}}>Próximamente...</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}