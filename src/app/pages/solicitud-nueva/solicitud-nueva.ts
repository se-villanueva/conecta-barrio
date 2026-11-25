import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LideresService } from '../../services/lideres.service';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  imports: [RouterLink],
  selector: 'app-solicitud-nueva',
  styleUrl: './solicitud-nueva.css',
  templateUrl: './solicitud-nueva.html',
})
export class SolicitudNueva {
  protected readonly solicitudes = inject(SolicitudesService);
  protected readonly lideres = inject(LideresService);

  protected readonly errores = signal<{ lider?: string; titulo?: string; descripcion?: string }>({});
  protected readonly exito = signal(false);

  constructor() {
    this.lideres.cargarLideres();
  }

  protected enviar(evento: SubmitEvent, form: HTMLFormElement): void {
    evento.preventDefault();
    this.exito.set(false);
    const datos = new FormData(form);
    const userId = Number(datos.get('lider'));
    const title = String(datos.get('titulo') ?? '').trim();
    const body = String(datos.get('descripcion') ?? '').trim();

    const errores: { lider?: string; titulo?: string; descripcion?: string } = {};
    if (!this.lideres.lideres().some((l) => l.id === userId)) errores.lider = 'Selecciona un líder de la lista.';
    if (title.length < 5) errores.titulo = 'El asunto debe tener al menos 5 caracteres.';
    else if (title.length > 100) errores.titulo = 'El asunto no puede superar 100 caracteres.';
    if (body.length < 10) errores.descripcion = 'Describe el caso con al menos 10 caracteres.';
    this.errores.set(errores);
    if (Object.keys(errores).length) return;

    this.solicitudes.crearSolicitud({ userId, title, body }, () => {
      form.reset();
      this.exito.set(true);
    });
  }
}
