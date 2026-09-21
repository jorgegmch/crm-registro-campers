export type RolUsuario = "admin" | "master" | "comercial";

export interface Opcion {
    valor_opcion: string;
    etiqueta_opcion: string;
}

export interface ObservacionHistorial {
    id_evento: string;
    fecha: string;
    autor: string;
    texto: string;
}

// Campos del formulario
export interface FormularioCamper {
    nombre_completo: string;
    direccion_residencia: string;
    telefono: string;
    correo_electronico: string;
    jornada_interes: string;
    estado: string;
    observaciones: string;
    foto_perfil: string;
    comercial_asignado: string;
}

// Registro guardado en la API
export interface Camper extends Omit<FormularioCamper, "observaciones"> {
    historial_observaciones: ObservacionHistorial[];
}