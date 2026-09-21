import { type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "../../styles/MainLayout.module.css";

interface MainLayoutProps {
    children: ReactNode;
    usuario: { nombre: string; rol: string };
    alCambiarPerfil: () => void;
}

export default function MainLayout({ children, usuario, alCambiarPerfil }: MainLayoutProps) {
    return (
        <div className={styles.layout_principal}>
            <Sidebar />
            <div className={styles.contenedor_derecho}>
                <Header usuario={usuario} alCambiarPerfil={alCambiarPerfil} />
                <main className={styles.main_content}>
                    {children}
                </main>
            </div>
        </div>
    );
}