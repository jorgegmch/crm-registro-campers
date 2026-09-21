import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import RegistroCampersPage from './pages/RegistroCampersPage';

type PerfilDemo = "admin" | "comercial";

// Perfiles de demostración. En el CRM original el rol llegaba desde el login (login.json);
// aquí se alterna desde el Header para mostrar cómo cambia el formulario según el rol.
const PERFILES_DEMO: Record<PerfilDemo, { nombre: string; rol: string }> = {
  admin: { nombre: "Admin", rol: "Administrador" },
  comercial: { nombre: "Carlos Ventas", rol: "Comercial" },
};

function Proximamente() {
  return <div style={{ color: 'white' }}>Próximamente... (fuera del alcance de este módulo)</div>;
}

export default function App() {
  const [perfil, setPerfil] = useState<PerfilDemo>("admin");
  const usuario = PERFILES_DEMO[perfil];

  const alternarPerfil = () => {
    setPerfil((actual) => (actual === "admin" ? "comercial" : "admin"));
  };

  return (
    <Router>
      <MainLayout usuario={usuario} alCambiarPerfil={alternarPerfil}>
        <Routes>
          <Route path="/" element={<Navigate to="/registro" />} />
          <Route
            path="/registro"
            element={
              <RegistroCampersPage
                key={perfil}
                rolUsuario={perfil}
                nombreUsuario={usuario.nombre}
              />
            }
          />
          <Route path="*" element={<Proximamente />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}