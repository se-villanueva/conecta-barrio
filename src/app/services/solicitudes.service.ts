import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NuevaSolicitud, Solicitud } from '../models/solicitud.model';

const API = 'https://jsonplaceholder.typicode.com/posts';
const CLAVE_PRIORIDADES = 'conectabarrio.prioridades';

@Injectable({ providedIn: 'root' })
export class SolicitudesService {
  private readonly http = inject(HttpClient);

  private readonly _solicitudes = signal<Solicitud[]>([]);
  private readonly _prioritarios = signal<Set<number>>(this.leerPrioridades());
  private readonly _cargando = signal(false);
  private readonly _cargada = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _enviando = signal(false);
  private readonly _errorEnvio = signal<string | null>(null);
  private readonly _ultimaCreada = signal<Solicitud | null>(null);

  readonly solicitudes = this._solicitudes.asReadonly();
  readonly prioritarios = this._prioritarios.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly cargada = this._cargada.asReadonly();
  readonly error = this._error.asReadonly();
  readonly enviando = this._enviando.asReadonly();
  readonly errorEnvio = this._errorEnvio.asReadonly();
  readonly ultimaCreada = this._ultimaCreada.asReadonly();

  readonly totalSolicitudes = computed(() => this._solicitudes().length);
  readonly totalPrioritarias = computed(() => this._prioritarios().size);

  cargarSolicitudes(forzar = false): void {
    if (this._cargando() || (this._cargada() && !forzar)) return;
    this._error.set(null);
    this._cargando.set(true);
    this.http.get<Solicitud[]>(API).subscribe({
      next: (datos) => {
        // conserva las creadas en sesión (id > 100) si se recarga
        const locales = this._solicitudes().filter((s) => s.id > 100);
        this._solicitudes.set([...locales, ...datos]);
        this._cargada.set(true);
        this._cargando.set(false);
      },
      error: () => {
        this._error.set('No pudimos cargar las solicitudes. Revisa tu conexión e inténtalo de nuevo.');
        this._cargando.set(false);
      },
    });
  }

  crearSolicitud(cuerpo: NuevaSolicitud, alExito?: () => void): void {
    if (this._enviando()) return;
    this._errorEnvio.set(null);
    this._enviando.set(true);
    this.http.post<Solicitud>(API, cuerpo).subscribe({
      next: (creada) => {
        // JSONPlaceholder siempre responde id 101: lo hacemos único en sesión
        const id = Math.max(100, ...this._solicitudes().map((s) => s.id)) + 1;
        const nueva = { ...cuerpo, ...creada, id };
        this._solicitudes.update((lista) => [nueva, ...lista]);
        this._ultimaCreada.set(nueva);
        this._enviando.set(false);
        alExito?.();
      },
      error: () => {
        this._errorEnvio.set('No se pudo registrar la solicitud. Tus datos siguen en el formulario; intenta de nuevo.');
        this._enviando.set(false);
      },
    });
  }

  obtenerPorId(id: number): Solicitud | undefined {
    return this._solicitudes().find((s) => s.id === id);
  }

  esPrioritaria(id: number): boolean {
    return this._prioritarios().has(id);
  }

  alternarPrioridad(id: number): void {
    const copia = new Set(this._prioritarios());
    if (!copia.delete(id)) copia.add(id);
    this._prioritarios.set(copia);
    this.guardarPrioridades(copia);
  }

  private leerPrioridades(): Set<number> {
    try {
      const datos = JSON.parse(localStorage.getItem(CLAVE_PRIORIDADES) ?? '[]');
      return new Set(Array.isArray(datos) ? datos.filter((n) => Number.isInteger(n)) : []);
    } catch {
      return new Set();
    }
  }

  private guardarPrioridades(ids: Set<number>): void {
    try {
      localStorage.setItem(CLAVE_PRIORIDADES, JSON.stringify([...ids]));
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }
}
