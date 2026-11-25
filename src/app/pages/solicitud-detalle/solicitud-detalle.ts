import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LideresService } from '../../services/lideres.service';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  imports: [RouterLink],
  selector: 'app-solicitud-detalle',
  styleUrl: './solicitud-detalle.css',
  templateUrl: './solicitud-detalle.html',
})
export class SolicitudDetalle {
  /** Llega desde la ruta gracias a withComponentInputBinding */
  readonly id = input<string>();

  protected readonly servicio = inject(SolicitudesService);
  private readonly lideresServicio = inject(LideresService);

  protected readonly idNumerico = computed(() => {
    const valor = this.id();
    const n = Number(valor);
    return valor && Number.isInteger(n) && n > 0 ? n : null;
  });
  protected readonly solicitud = computed(() => {
    const n = this.idNumerico();
    return n === null ? undefined : this.servicio.solicitudes().find((s) => s.id === n);
  });
  protected readonly lider = computed(() => {
    const s = this.solicitud();
    return s ? this.lideresServicio.lideres().find((l) => l.id === s.userId) : undefined;
  });

  constructor() {
    this.servicio.cargarSolicitudes();
    this.lideresServicio.cargarLideres();
  }
}
