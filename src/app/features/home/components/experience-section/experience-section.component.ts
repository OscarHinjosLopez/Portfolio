import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { ExperienceItemComponent } from '../experience-item/experience-item.component';
import { EXPERIENCES } from '../../data/experience.data';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [SectionHeadingComponent, ExperienceItemComponent],
  template: `<section id="experience" class="section" aria-labelledby="experience-heading">
    <div class="container">
      <app-section-heading
        id="experience-heading"
        eyebrow="04 / EXPERIENCE"
        title="Experiencia profesional"
        description="Experiencia desarrollando y evolucionando aplicaciones web en entornos enterprise, sector público, industria y producto SaaS."
      />
      <div class="timeline">
        @for (experience of experiences; track experience.id; let index = $index) {
          <app-experience-item [experience]="experience" [index]="index + 1" />
        }
      </div>
    </div>
  </section>`,
  styleUrl: './experience-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSectionComponent {
  readonly experiences = EXPERIENCES;
}
