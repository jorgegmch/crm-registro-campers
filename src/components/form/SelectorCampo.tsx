import styles from "../../styles/RegistroCampers.module.css";
import type { Opcion } from "../../types/campers_types";

interface Props {
    id_campo: string;
    etiqueta_campo: string;
    valor_seleccionado: string;
    opciones_disponibles: Opcion[];
    manejar_cambio: (valor: string) => void;
}

export default function SelectorCampo({
    id_campo,
    etiqueta_campo,
    valor_seleccionado,
    opciones_disponibles,
    manejar_cambio
}: Props) {
    return (
        <div className={styles.campo}>
            <label htmlFor={id_campo} className={styles.label}>
                {etiqueta_campo}
            </label>

            <select
                id={id_campo}
                className={styles.select_estilizado}
                value={valor_seleccionado}
                onChange={(e) => manejar_cambio(e.target.value)}
            >
                <option value="">Selecciona una opción</option>
                {opciones_disponibles.map(op => (
                    <option key={op.valor_opcion} value={op.valor_opcion}>
                        {op.etiqueta_opcion}
                    </option>
                ))}
            </select>
        </div>
    );
}