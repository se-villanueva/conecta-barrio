/** Contrato remoto de JSONPlaceholder /posts */
export interface Solicitud {
  id: number;
  userId: number;
  title: string;
  body: string;
}

/** Cuerpo de creación: el id lo asigna el servidor */
export type NuevaSolicitud = Omit<Solicitud, 'id'>;
