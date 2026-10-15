import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
@Component({
  selector: 'app-selected-work',
  standalone: true,
  imports: [SectionHeadingComponent],
  template: `<section id="work" class="section" aria-labelledby="work-heading">
    <div class="container">
      <app-section-heading
        id="work-heading"
        eyebrow="04 / PROYECTOS"
        title="Proyectos"
        description="Próximamente compartiré aquí una selección de mis proyectos."
      />
    </div>
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedWorkComponent {}
