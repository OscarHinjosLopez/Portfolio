import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { PROFILE } from '../../../../core/config/profile.config';
import { CV_URL } from '../hero/hero.component';

describe('ContactComponent', () => {
  it('renders the contact landmark, heading, visible email and availability', async () => {
    TestBed.configureTestingModule({ imports: [ContactComponent] });
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('section#contact')?.getAttribute('aria-labelledby')).toBe(
      'contact-heading',
    );
    expect(element.querySelector('h2')?.textContent).toBe('¿Construimos algo?');
    const email = element.querySelector('a[href="mailto:hinjoslopezoscar@gmail.com"]');
    expect(email?.textContent).toBe('hinjoslopezoscar@gmail.com');
    expect(element.textContent?.replace(/\s+/g, ' ')).toContain(
      'Disponible para nuevas oportunidades',
    );
    expect(element.textContent).toContain('Madrid · España');
    expect(element.textContent).toContain('Remoto / Híbrido');
    expect(element.querySelector('form')).toBeNull();
  });

  it('uses the real professional links with secure external attributes and the Hero CV', async () => {
    TestBed.configureTestingModule({ imports: [ContactComponent] });
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    for (const [label, url] of [
      ['LinkedIn', PROFILE.linkedin],
      ['GitHub', PROFILE.github],
    ]) {
      const link = element.querySelector(`a[href="${url}"]`);
      expect(link?.textContent).toContain(label);
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    }
    const cv = element.querySelector('a[download]');
    expect(cv?.textContent).toContain('Descargar CV');
    expect(cv?.getAttribute('href')).toBe(CV_URL);
    expect(cv?.getAttribute('download')).toBe('CV_Oscar_Hinjos.pdf');
  });
});
