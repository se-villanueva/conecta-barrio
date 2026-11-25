import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Inicio · ConectaBarrio', loadComponent: () => import('./pages/inicio/inicio').then((m) => m.Inicio) },
  { path: 'solicitudes', title: 'Solicitudes · ConectaBarrio', loadComponent: () => import('./pages/solicitudes-listado/solicitudes-listado').then((m) => m.SolicitudesListado) },
  // 'nueva' va antes de ':id' para que no se interprete como un id
  { path: 'solicitudes/nueva', title: 'Nueva solicitud · ConectaBarrio', loadComponent: () => import('./pages/solicitud-nueva/solicitud-nueva').then((m) => m.SolicitudNueva) },
  { path: 'solicitudes/:id', title: 'Detalle · ConectaBarrio', loadComponent: () => import('./pages/solicitud-detalle/solicitud-detalle').then((m) => m.SolicitudDetalle) },
  { path: 'lideres', title: 'Líderes · ConectaBarrio', loadComponent: () => import('./pages/lideres-listado/lideres-listado').then((m) => m.LideresListado) },
  { path: '**', title: 'No encontrada · ConectaBarrio', loadComponent: () => import('./pages/no-encontrada/no-encontrada').then((m) => m.NoEncontrada) },
];
