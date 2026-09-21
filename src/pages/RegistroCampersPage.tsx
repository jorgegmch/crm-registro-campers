import { useState } from "react";
import styles from "../styles/RegistroCampers.module.css";
import InputCampo from "../components/form/InputCampo";
import SelectorCampo from "../components/form/SelectorCampo";
import SubidaFoto from "../components/form/SubidaFoto";
import BotonRegistro from "../components/form/BotonRegistro";
import comerciales from "../../data/comerciales.json";

export type RolUsuario = "admin" | "master" | "comercial";

interface RegistroCampersProps {
    rolUsuario?: RolUsuario;
    nombreUsuario?: string;
}

interface Opcion {
    valor_opcion: string;
    etiqueta_opcion: string;
}

const API_URL = "http://localhost:4000";

const OPCIONES_JORNADA: Opcion[] = [
    { valor_opcion: "manana", etiqueta_opcion: "Mañana" },
    { valor_opcion: "tarde", etiqueta_opcion: "Tarde" },
    { valor_opcion: "noche", etiqueta_opcion: "Noche" },
];

const OPCIONES_ESTADO: Opcion[] = [
    { valor_opcion: "activo", etiqueta_opcion: "Activo" },
    { valor_opcion: "inactivo", etiqueta_opcion: "Inactivo" },
    { valor_opcion: "en_proceso", etiqueta_opcion: "En Proceso" },
    { valor_opcion: "registrado", etiqueta_opcion: "Registrado" },
    { valor_opcion: "preseleccionado", etiqueta_opcion: "Pre-seleccionado" },
    { valor_opcion: "admitido", etiqueta_opcion: "Admitido" },
    { valor_opcion: "rechazado", etiqueta_opcion: "Rechazado" },
    { valor_opcion: "agendado", etiqueta_opcion: "Agendado" },
];

// Datos de referencia (solo lectura): se leen de data/comerciales.json
const OPCIONES_COMERCIAL: Opcion[] = comerciales.map((c) => ({
    valor_opcion: c.nombre,
    etiqueta_opcion: c.nombre,
}));

const ESTADO_INICIAL = {
    nombre_completo: "",
    direccion_residencia: "",
    telefono: "",
    correo_electronico: "",
    jornada_interes: "",
    estado: "",
    observaciones: "",
    foto_perfil: "",
    comercial_asignado: "",
};

export default function RegistroCampersPage({
    rolUsuario = "admin",
    nombreUsuario = "Usuario Demo",
}: RegistroCampersProps) {
    const puedeAsignarComercial = rolUsuario === "admin" || rolUsuario === "master";

    const [formulario, setFormulario] = useState(ESTADO_INICIAL);
    const [procesando, setProcesando] = useState(false);

    const actualizar = (campo: string, valor: string) => {
        setFormulario((prev) => ({ ...prev, [campo]: valor }));
    };

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formulario.nombre_completo.trim()) {
            alert("El nombre es obligatorio.");
            return;
        }
        if (puedeAsignarComercial && !formulario.comercial_asignado) {
            alert("Debes asignar un comercial.");
            return;
        }

        setProcesando(true);
        try {
            const { observaciones, ...restoDatos } = formulario;

            // Comercial: se asigna a sí mismo. Admin/Master: eligen en el selector.
            const comercialFinal =
                rolUsuario === "comercial" ? nombreUsuario : formulario.comercial_asignado;

            const leadAEnviar = {
                ...restoDatos,
                comercial_asignado: comercialFinal,
                historial_observaciones: [
                    {
                        id_evento: crypto.randomUUID(),
                        fecha: new Date().toISOString(),
                        autor: nombreUsuario,
                        texto: observaciones,
                    },
                ],
            };

            const respuesta = await fetch(`${API_URL}/campers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadAEnviar),
            });

            if (!respuesta.ok) throw new Error("Error en el servidor");

            alert(`¡Registro exitoso! Asignado a: ${comercialFinal}`);
            setFormulario(ESTADO_INICIAL);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al conectar con la API. Verifica que json-server esté corriendo (npm run api).");
        } finally {
            setProcesando(false);
        }
    };

    return (
        <div className={styles.wrapper_registro}>
            <h1 className={styles.titulo_formulario}>Registro de Campers</h1>
            <div className={styles.tarjeta_formulario}>
                <form onSubmit={enviar} className={styles.grid_formulario}>
                    <SubidaFoto
                        foto_actual={formulario.foto_perfil}
                        manejar_cambio_foto={(foto) => actualizar("foto_perfil", foto)}
                    />

                    <InputCampo id_campo="nom" etiqueta_campo="Nombre" valor_input={formulario.nombre_completo} manejar_cambio={(v) => actualizar("nombre_completo", v)} />
                    <InputCampo id_campo="dir" etiqueta_campo="Dirección" valor_input={formulario.direccion_residencia} manejar_cambio={(v) => actualizar("direccion_residencia", v)} />
                    <InputCampo id_campo="tel" etiqueta_campo="Teléfono" valor_input={formulario.telefono} manejar_cambio={(v) => actualizar("telefono", v)} />
                    <InputCampo id_campo="mail" etiqueta_campo="Correo" tipo_input="email" valor_input={formulario.correo_electronico} manejar_cambio={(v) => actualizar("correo_electronico", v)} />

                    <SelectorCampo id_campo="jor" etiqueta_campo="Jornada" valor_seleccionado={formulario.jornada_interes} opciones_disponibles={OPCIONES_JORNADA} manejar_cambio={(v) => actualizar("jornada_interes", v)} />
                    <SelectorCampo id_campo="estado" etiqueta_campo="Estado" valor_seleccionado={formulario.estado} opciones_disponibles={OPCIONES_ESTADO} manejar_cambio={(v) => actualizar("estado", v)} />

                    {puedeAsignarComercial && (
                        <div className={styles.columna_completa}>
                            <SelectorCampo
                                id_campo="asignacion"
                                etiqueta_campo="Asignar a un Comercial (Obligatorio)"
                                valor_seleccionado={formulario.comercial_asignado}
                                opciones_disponibles={OPCIONES_COMERCIAL}
                                manejar_cambio={(v) => actualizar("comercial_asignado", v)}
                            />
                        </div>
                    )}

                    <div className={styles.columna_completa}>
                        <InputCampo id_campo="obs" etiqueta_campo="Observación" es_multilinea valor_input={formulario.observaciones} manejar_cambio={(v) => actualizar("observaciones", v)} />
                    </div>

                    <BotonRegistro etiqueta_boton={procesando ? "Guardando..." : "Completar Registro"} deshabilitado={procesando} />
                </form>
            </div>
        </div>
    );
}