import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolicitudCard } from '../../components/solicitud-card/solicitud-card';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  imports: [SolicitudCard, RouterLink],
  selector: 'app-solicitudes-listado',
  styleUrl: './solicitudes-listado.css',
  templateUrl: './solicitudes-listado.html',
})
export class SolicitudesListado {
  protected readonly servicio = inject(SolicitudesService);
  protected readonly busqueda = signal('');

  protected readonly filtradas = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const todas = this.servicio.solicitudes();
    if (!texto) return todas;
    return todas.filter((s) => s.title.toLowerCase().includes(texto) || s.body.toLowerCase().includes(texto));
  });

  constructor() {
    this.servicio.cargarSolicitudes();
  }

  protected reintentar(): void {
    this.servicio.cargarSolicitudes(true);
  }
}
