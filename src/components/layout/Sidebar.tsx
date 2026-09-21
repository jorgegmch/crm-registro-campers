import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/MainLayout.module.css";

export default function Sidebar() {
    const location = useLocation();
    const [menuCampersAbierto, setMenuCampersAbierto] = useState(true);
    const [menuContratosAbierto, setMenuContratosAbierto] = useState(false);

    const esActivo = (path: string) => location.pathname === path;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.contenedor_logo}>
                <span className={styles.logo_texto}>Campus</span>
                <span className={styles.logo_resaltado}>Lands</span>
            </div>

            <nav className={styles.menu_navegacion}>
                <Link to="/dashboard" className={`${styles.item_menu} ${esActivo('/dashboard') ? styles.item_activo : ''}`}>
                    <span>📊 Dashboard</span>
                </Link>

                {/* Sección Campers */}
                <div className={styles.item_menu_desplegable} onClick={() => setMenuCampersAbierto(!menuCampersAbierto)}>
                    <span>🎓 Campers</span>
                    <span>{menuCampersAbierto ? '⌄' : '›'}</span>
                </div>
                {menuCampersAbierto && (
                    <div className={styles.contenedor_sub_items}>
                        <Link to="/registro" className={`${styles.sub_item} ${esActivo('/registro') ? styles.sub_item_activo : ''}`}>
                            🆔 Registro
                        </Link>
                        <Link to="/consultar" className={`${styles.sub_item} ${esActivo('/consultar') ? styles.sub_item_activo : ''}`}>
                            🔍 Consultar
                        </Link>
                    </div>
                )}

                {/* Sección Contratos (Restaurada) */}
                <div className={styles.item_menu_desplegable} onClick={() => setMenuContratosAbierto(!menuContratosAbierto)}>
                    <span>📄 Contratos</span>
                    <span>{menuContratosAbierto ? '⌄' : '›'}</span>
                </div>
                {menuContratosAbierto && (
                    <div className={styles.contenedor_sub_items}>
                        <Link to="/contratos/lista" className={styles.sub_item}>📋 Ver Todos</Link>
                    </div>
                )}

                <Link to="/facturacion" className={`${styles.item_menu} ${esActivo('/facturacion') ? styles.item_activo : ''}`}>
                    <span>🧾 Facturación</span>
                </Link>

                <Link to="/recaudo" className={`${styles.item_menu} ${esActivo('/recaudo') ? styles.item_activo : ''}`}>
                    <span>💰 Recaudo</span>
                </Link>
            </nav>
            
            <div style={{marginTop: 'auto', color: '#94a3b8', cursor: 'pointer', padding: '10px'}}>🚪 Cerrar Sesión</div>
        </aside>
    );
}