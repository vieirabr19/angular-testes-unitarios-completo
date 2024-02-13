import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { InputOutputComponent } from './input-output.component';

describe('InputOutputComponent', () => {
  let component: InputOutputComponent;
  let fixture: ComponentFixture<InputOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputOutputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve receber o usuário', () => {
    const user = { name: 'Luiz', email: 'luiz@gmail.com', password: '123' };

    component.user = user;

    expect(component.user).toBe(user);
  });

  it('Deve emitir uma mensagem quando clicar no botão', () => {
    const spyUserMessage = spyOn(component.userMessage, 'emit');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    //Caso queira testar sem clicar no butão no botão do HTML
    // component.onUserEmit();

    expect(spyUserMessage).toHaveBeenCalled();
  });
});
