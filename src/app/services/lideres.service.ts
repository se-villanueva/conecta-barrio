import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Lider } from '../models/lider.model';

const API = 'https://jsonplaceholder.typicode.com/users';

@Injectable({ providedIn: 'root' })
export class LideresService {
  private readonly http = inject(HttpClient);

  private readonly _lideres = signal<Lider[]>([]);
  private readonly _cargando = signal(false);
  private readonly _cargada = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly lideres = this._lideres.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly cargada = this._cargada.asReadonly();
  readonly error = this._error.asReadonly();

  cargarLideres(forzar = false): void {
    if (this._cargando() || (this._cargada() && !forzar)) return;
    this._error.set(null);
    this._cargando.set(true);
    this.http.get<Lider[]>(API).subscribe({
      next: (datos) => {
        this._lideres.set(datos);
        this._cargada.set(true);
        this._cargando.set(false);
      },
      error: () => {
        this._error.set('No pudimos cargar los líderes. Inténtalo de nuevo.');
        this._cargando.set(false);
      },
    });
  }

  obtenerPorId(id: number): Lider | undefined {
    return this._lideres().find((l) => l.id === id);
  }
}
