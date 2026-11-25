import { Component, inject } from '@angular/core';
import { LideresService } from '../../services/lideres.service';

@Component({
  selector: 'app-lideres-listado',
  styleUrl: './lideres-listado.css',
  templateUrl: './lideres-listado.html',
})
export class LideresListado {
  protected readonly servicio = inject(LideresService);

  constructor() {
    this.servicio.cargarLideres();
  }
}
