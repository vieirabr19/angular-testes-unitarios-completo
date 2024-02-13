import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { AsynchronousComponentComponent } from './asynchronous-component.component';
import { HttpService } from '../service/http.service';

describe('AsynchronousComponentComponent', () => {
  let component: AsynchronousComponentComponent;
  let fixture: ComponentFixture<AsynchronousComponentComponent>;
  let service: HttpService;

  const responseUsers = [
    {
      name: 'Danilo 2',
      email: 'danilo@gmail.com',
      age: 30,
      id: 1,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsynchronousComponentComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AsynchronousComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve fazer request para obter lista de usuarios', () => {
    spyOn(service, 'getUsers').and.returnValue(of(responseUsers));

    component.getUsers();

    expect(component.data).toEqual(responseUsers);
  });

  it('Deve fazer request para obter lista de usuarios com promise', async () => {
    spyOn(service, 'getUsersWithPromise').and.returnValue(
      Promise.resolve(responseUsers)
    );

    await component.getUsersWithPromise();

    expect(component.dataPromise).toEqual(responseUsers);
  });

  it('Deve logar usuário', (done: DoneFn) => {
    const loggedOut = fixture.debugElement.query(
      By.css('.logged-out')
    ).nativeElement;

    fixture.detectChanges();
    expect(loggedOut.textContent).toBe('Deslogado');

    const spy = spyOn(service, 'isAuthenticated').and.returnValue(
      Promise.resolve(true)
    );

    component.isAuthenticaded();

    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      const logged = fixture.debugElement.query(
        By.css('.logged')
      ).nativeElement;
      expect(logged.textContent).toBe('Logado');
      done();
    });
  });

  it('Deve logar usuario com whenStable', async () => {
    const loggedOut = fixture.debugElement.query(
      By.css('.logged-out')
    ).nativeElement;

    fixture.detectChanges();
    expect(loggedOut.textContent).toBe('Deslogado');

    spyOn(service, 'isAuthenticated').and.returnValue(Promise.resolve(true));

    component.isAuthenticaded();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const logged = fixture.debugElement.query(
        By.css('.logged')
      ).nativeElement;

      expect(logged.textContent).toBe('Logado');
    });
  });

  it('Deve setar nome após 100 milisegundos', fakeAsync(() => {
    component.defineValue();

    tick(100);
    expect(component.name).toBe('Jessica');
  }));
});
