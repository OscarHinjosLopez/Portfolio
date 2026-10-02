import { TestBed } from '@angular/core/testing';
import { CredentialsStripComponent } from './credentials-strip.component';

describe('CredentialsStripComponent', () => {
  it('renders the four credentials with their professional context', async () => {
    const fixture = TestBed.createComponent(CredentialsStripComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect([...element.querySelectorAll('dd')].map((item) => item.textContent?.trim())).toEqual([
      'Desde 2022',
      'Angular',
      'TypeScript',
      'React',
    ]);
    expect([...element.querySelectorAll('dt')].map((item) => item.textContent?.trim())).toEqual([
      'Experiencia profesional',
      'Especialización principal',
      'Stack principal',
      'Experiencia profesional',
    ]);
  });
});
