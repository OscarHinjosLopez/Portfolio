import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';
import { PROFILE } from '../../core/config/profile.config';

describe('FooterComponent', () => {
  it('renders the final footer, current year and return to top', async () => {
    TestBed.configureTestingModule({ imports: [FooterComponent], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(FooterComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('footer')).toBeTruthy();
    expect(element.querySelector('.brand')?.textContent).toBe('OH.');
    expect(fixture.componentInstance.currentYear).toBe(new Date().getFullYear());
    expect(element.textContent).toContain(`© ${new Date().getFullYear()} Oscar Hinjos`);
    expect(element.textContent).toContain('Built with Angular');
    expect(element.querySelector('nav a[href="/#top"]')?.textContent).toContain('Volver arriba');
    for (const [label, url] of [
      ['LinkedIn', PROFILE.linkedin],
      ['GitHub', PROFILE.github],
    ]) {
      const link = element.querySelector(`a[href="${url}"]`);
      expect(link?.textContent).toContain(label);
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });
});
