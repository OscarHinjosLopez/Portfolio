import { TestBed } from '@angular/core/testing';
import { TechChipComponent } from './tech-chip.component';

describe('TechChipComponent', () => {
  it('supports emphasis and subtle variants while preserving its label', async () => {
    const fixture = TestBed.createComponent(TechChipComponent);
    fixture.componentRef.setInput('label', 'Angular');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.dataset['variant']).toBe('default');
    fixture.componentRef.setInput('variant', 'emphasis');
    await fixture.whenStable();
    expect(element.dataset['variant']).toBe('emphasis');
    fixture.componentRef.setInput('variant', 'subtle');
    await fixture.whenStable();
    expect(element.dataset['variant']).toBe('subtle');
    expect(element.textContent?.trim()).toBe('Angular');
  });
  it('renders and updates its label', async () => {
    const fixture = TestBed.createComponent(TechChipComponent);
    fixture.componentRef.setInput('label', 'Angular');
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('Angular');
    fixture.componentRef.setInput('label', 'TypeScript');
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('TypeScript');
  });
});
