export interface Book {
    titulo: string,
    descripcion: string,
    id: string
};

export interface Content {
    titulo: string,
    descripcion: string,
    id: string,
    puntaje_maximo: number,
    dependencias: string[],
    recomended: boolean
};

export interface Block {
    id: string,
    id_bloque_anterior: string,
    tipo: "Texto" | "Imagen" | "Titulo",
    contenido: string,
    descripcion: {
        tipo: string,
        contenido: string
    }
};

export interface Question {
    id: string,
    id_contenido: string,
    titulo: string,
    descripcion?: string,
    respuestas_erroneas: string[],
    respuesta_correcta: string,
    dificultad: number
};

export interface Revision {
    id: string,
    preguntas: Question[],
    dificultad: number
};