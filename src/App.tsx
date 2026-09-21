import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import RegistroCampersPage from './pages/RegistroCampersPage';
import FueraDeAlcance from './pages/FueraDeAlcance';

type PerfilDemo = "admin" | "comercial";

// Perfiles de prueba, se alternan desde el Header
const PERFILES_DEMO: Record<PerfilDemo, { nombre: string; rol: string }> = {
  admin: { nombre: "Admin", rol: "Administrador" },
  comercial: { nombre: "Carlos Ventas", rol: "Comercial" },
};

// Módulos del CRM que no están en este repo
const MODULOS_EXTERNOS = [
  { ruta: "/dashboard", nombre: "Dashboard" },
  { ruta: "/consultar", nombre: "Consultar Campers" },
  { ruta: "/contratos/lista", nombre: "Contratos" },
  { ruta: "/facturacion", nombre: "Facturación" },
  { ruta: "/recaudo", nombre: "Recaudo" },
];

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
          {MODULOS_EXTERNOS.map(({ ruta, nombre }) => (
            <Route key={ruta} path={ruta} element={<FueraDeAlcance nombre={nombre} />} />
          ))}
          <Route path="*" element={<Navigate to="/registro" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}