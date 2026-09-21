import styles from "../../styles/MainLayout.module.css";

interface HeaderProps {
    usuario: { nombre: string; rol: string; avatar?: string };
    alCambiarPerfil: () => void;
}

export default function Header({ usuario, alCambiarPerfil }: HeaderProps) {
    return (
        <header className={styles.header}>
            <button
                type="button"
                className={styles.perfil_usuario}
                onClick={alCambiarPerfil}
                title="Clic para cambiar de perfil (demo)"
            >
                {usuario.avatar ? (
                    <img 
                        src={usuario.avatar} 
                        className={styles.avatar_circulo} 
                        alt="User" 
                    />
                ) : (
                    <div className={styles.avatar_circulo}></div>
                )}

                <div className={styles.info_texto}>
                    <span className={styles.nombre_usuario}>
                        {usuario.nombre}
                    </span>
                    <span className={styles.rol_usuario}>
                        {usuario.rol}
                    </span>
                </div>

                <span className={styles.flecha}>⇄</span>
            </button>
        </header>
    );
}