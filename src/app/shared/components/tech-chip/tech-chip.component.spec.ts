import { TestBed } from '@angular/core/testing';
import { TechChipComponent } from './tech-chip.component';

describe('TechChipComponent', () => {
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
