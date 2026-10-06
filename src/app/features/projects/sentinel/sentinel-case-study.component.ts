import { ScrollSpyDirective } from '../../../shared/directives/scroll-spy.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TechChipComponent } from '../../../shared/components/tech-chip/tech-chip.component';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { PROJECTS } from '../../home/data/projects.data';

@Component({
  selector: 'app-sentinel-case-study',
  standalone: true,
  imports: [
    ScrollSpyDirective,
    RouterLink,
    ButtonComponent,
    TechChipComponent,
    SectionHeadingComponent,
  ],
  templateUrl: './sentinel-case-study.component.html',
  styleUrl: './sentinel-case-study.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentinelCaseStudyComponent {
  readonly demoUrl = PROJECTS.find((project) => project.slug === 'sentinel')!.actions.find(
    (action) => action.type === 'external',
  )!.url;
  readonly technologies = [
    'Angular',
    'TypeScript',
    'Signals',
    'RxJS',
    'Material/CDK',
    'WebSockets',
  ];
  readonly sections = [
    { id: 'context', label: 'Context' },
    { id: 'product', label: 'Product' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'authorization', label: 'Authorization' },
    { id: 'threats', label: 'Threats & Devices' },
    { id: 'realtime', label: 'Realtime' },
    { id: 'ux-states', label: 'UX states' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'testing', label: 'Testing' },
    { id: 'performance', label: 'Performance' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'result', label: 'Result' },
    { id: 'learnings', label: 'Learnings' },
  ];
  readonly goals = [
    {
      title: 'Information density',
      text: 'Presentar información densa manteniendo jerarquía y capacidad de escaneo.',
    },
    {
      title: 'Real-time UX',
      text: 'Actualizar información crítica sin interrumpir el flujo de trabajo.',
    },
    {
      title: 'Role-based experience',
      text: 'Adaptar navegación y acciones a Admin, Analyst y Viewer.',
    },
    {
      title: 'Quality',
      text: 'Construir una interfaz responsive, accesible y preparada para testing automatizado.',
    },
  ];
  readonly modules = [
    { title: 'Overview', text: 'KPIs, actividad y estado de seguridad con gráficas.' },
    { title: 'Threats', text: 'Listado, filtros, detalle y cambios locales de estado.' },
    { title: 'Devices', text: 'Inventario, postura de seguridad y acciones simuladas.' },
    { title: 'Realtime', text: 'Eventos simulados, estado de conexión y reconexión.' },
    { title: 'Notifications', text: 'Cambios relevantes con prioridades y feedback al usuario.' },
    {
      title: 'Audit · Preview',
      text: 'Workspace preparado; todavía sin registro de eventos conectado.',
    },
  ];
  readonly permissions = [
    { label: 'Ver Dashboard, Threats y Devices', roles: [true, true, true] },
    { label: 'Investigar amenazas', roles: [true, true, false] },
    { label: 'Gestionar dispositivos', roles: [true, false, false] },
    { label: 'Acceder a Audit (preview)', roles: [true, true, false] },
    { label: 'Acceder a Settings', roles: [true, false, false] },
  ];
  readonly authFlow = ['Login demo', 'Sesión', 'Guards', 'Aplicación', 'Permisos por rol'];
  readonly eventFlow = ['Evento simulado', 'RealtimeService', 'RxJS stream', 'Estado', 'UI'];
  readonly events = [
    'threat.created',
    'threat.updated',
    'threat.resolved',
    'device.status.changed',
    'security.score.changed',
  ];
  readonly states = [
    {
      title: 'Loading',
      text: 'Skeletons y aria-busy comunican la carga sin mostrar una pantalla vacía.',
    },
    {
      title: 'Empty',
      text: 'Un listado sin datos se distingue de una búsqueda sin resultados y permite limpiar filtros.',
    },
    {
      title: 'Error',
      text: 'Un mensaje recuperable y la acción Retry permiten repetir la consulta.',
    },
    {
      title: 'Success',
      text: 'Los cambios de estado y las notificaciones confirman el resultado de una acción.',
    },
  ];
  readonly challenges = [
    {
      title: 'Data density',
      problem: 'Mostrar información sin convertir la interfaz en ruido.',
      solution:
        'KPIs, filtros y detalles tienen niveles separados; el listado conserva severidad y estado como señales de lectura.',
    },
    {
      title: 'State',
      problem: 'Separar estado local, derivado y asíncrono.',
      solution:
        'Stores por feature con Signals y computed; contratos de repositorio y Observables para operaciones asíncronas.',
    },
    {
      title: 'Realtime',
      problem: 'Actualizar datos sin romper el contexto.',
      solution:
        'Validación, deduplicación y orden temporal; refrescos agrupados conservan filtros y paginación y descartan respuestas obsoletas.',
    },
    {
      title: 'Accessibility',
      problem: 'Mantener navegación y acciones utilizables con teclado.',
      solution:
        'Gestión del foco al navegar y cerrar diálogos, atajos, etiquetas de estado y pruebas de flujos con Playwright y axe.',
    },
  ];
  readonly learnings = [
    'Las aplicaciones data-dense necesitan jerarquía antes que decoración.',
    'Signals y RxJS funcionan mejor cuando cada herramienta tiene una responsabilidad clara.',
    'Accesibilidad y estados de interfaz deben formar parte del desarrollo desde el inicio.',
  ];
  readonly sectionIds = this.sections.map((section) => section.id);
}
