import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  protected readonly servicio = inject(SolicitudesService);

  constructor() {
    this.servicio.cargarSolicitudes();
  }
}
