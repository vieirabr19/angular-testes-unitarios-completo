import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Deve montar o objeto user no ngOnInit()', () => {
    const user = {
      name: 'Danilo',
      email: 'danilodev.silva@gmail.com',
      password: '091011',
    };

    component.ngOnInit();

    expect(component.user).toEqual(user);
  });

  it('Deve chamar a função getUserMessage() e imprimir o console.log', () => {
    const str = 'Recebi o usuario!';
    spyOn(console, 'log');

    component.getUserMessage(str);

    expect(console.log).toHaveBeenCalledWith('Mensagem do filho: ', str);
  });

  it('Deve chamar a função goTo() e direcionar para a página', () => {
    component.goTo('home');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('Deve chamar a função onMenuItemSelected() e imprimir o console.log', () => {
    const item = 'Item 1';
    spyOn(console, 'log');

    component.onMenuItemSelected(item);

    expect(console.log).toHaveBeenCalledWith('item selecionado -->> ', item);
  });
});
