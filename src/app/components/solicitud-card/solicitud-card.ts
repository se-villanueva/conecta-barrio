import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Solicitud } from '../../models/solicitud.model';

@Component({
  imports: [RouterLink],
  selector: 'app-solicitud-card',
  styleUrl: './solicitud-card.css',
  templateUrl: './solicitud-card.html',
})
export class SolicitudCard {
  readonly solicitud = input.required<Solicitud>();
  readonly prioritaria = input(false);
  readonly alternarPrioridad = output<number>();
}
