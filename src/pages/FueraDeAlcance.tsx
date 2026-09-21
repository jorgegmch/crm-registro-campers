import { Link } from "react-router-dom";
import styles from "../styles/FueraDeAlcance.module.css";

interface Props {
    nombre: string;
}

export default function FueraDeAlcance({ nombre }: Props) {
    return (
        <div className={styles.contenedor}>
            <span className={styles.etiqueta}>Fuera de alcance</span>
            <h1 className={styles.titulo}>{nombre}</h1>
            <p className={styles.descripcion}>
                Este módulo hace parte del CRM completo y no está incluido en este repositorio,
                que contiene únicamente el módulo de Registro de Campers.
            </p>
            <Link to="/registro" className={styles.enlace}>
                Ir a Registro de Campers
            </Link>
        </div>
    );
}