import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';

import { HandleEventComponent } from './handle-event.component';
import { By } from '@angular/platform-browser';

describe('HandleEventComponent', () => {
  let component: HandleEventComponent;
  let fixture: ComponentFixture<HandleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandleEventComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();

    fixture = TestBed.createComponent(HandleEventComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve definir o emoji ao clicar no botão', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    // triggerEventHandler não funciona com ComponentFixtureAutoDetect
    // button.triggerEventHandler('click', null);

    button.click();

    expect(title.textContent).toBe('👨‍🎓');
  });
});
