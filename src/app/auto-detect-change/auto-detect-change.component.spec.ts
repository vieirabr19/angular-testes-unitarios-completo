import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';

import { AutoDetectChangeComponent } from './auto-detect-change.component';
import { By } from '@angular/platform-browser';

describe('AutoDetectChangeComponent', () => {
  let component: AutoDetectChangeComponent;
  let fixture: ComponentFixture<AutoDetectChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoDetectChangeComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoDetectChangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve definir emoji ao clicar no botão', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    button.click();

    expect(title.textContent).toBe('👨‍🎓');
  });
});
