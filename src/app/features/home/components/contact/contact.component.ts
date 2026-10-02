import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../../../core/config/profile.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly profile = PROFILE;
}
