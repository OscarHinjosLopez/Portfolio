import { TestBed } from '@angular/core/testing';
import { SectionHeadingComponent } from './section-heading.component';

describe('SectionHeadingComponent', () => {
  it('renders a semantic h2 and conditionally renders optional copy', async () => {
    const fixture = TestBed.createComponent(SectionHeadingComponent);
    fixture.componentRef.setInput('title', 'Heading example');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toBe('Heading example');
    expect(element.querySelectorAll('p').length).toBe(0);
    fixture.componentRef.setInput('eyebrow', '01 / Example');
    fixture.componentRef.setInput('description', 'Supporting copy');
    await fixture.whenStable();
    expect(element.querySelector('.eyebrow')?.textContent).toBe('01 / Example');
    expect(element.querySelector('.description')?.textContent).toBe('Supporting copy');
  });
});
