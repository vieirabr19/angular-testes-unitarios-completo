import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RequestComponent } from './request.component';

import { HttpService } from '../service/http.service';

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;
  let httpMock: HttpTestingController;
  let service: HttpService;
  let url: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpService);

    url = 'http://localhost:3000';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve chamar a função getUsers() e invocar o serviço', () => {
    const response = [
      { name: 'Danilo', age: 30, email: 'danilodev.silva@gmail.com' },
      { name: 'Jose', age: 40, email: 'jose.silva@gmail.com' },
      { name: 'Maria', age: 22, email: 'maria.silva@gmail.com' },
    ];

    const spy = spyOn(service, 'getUsers').and.returnValue(of(response));
    component.getUsers();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Deve chamar a função postUsers() e invocar o serviço', () => {
    const userMock = {
      name: 'Luiz',
      age: '30',
      email: 'luiz@gmail.com',
      id: '0.9705986481641282',
    };

    component.name = userMock.name;
    component.age = userMock.age;
    component.email = userMock.email;

    component.postUsers();

    const req = httpMock.expectOne(`${url}/users`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('Deve chamar a função putUsers e invocar o service', () => {
    const userMock = {
      name: 'Luiz',
      age: '30',
      email: 'luiz@gmail.com',
    };
    const id = 12345;

    component.name = userMock.name;
    component.age = userMock.age;
    component.email = userMock.email;

    component.putUsers(id);

    const req = httpMock.expectOne(`${url}/users/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('Deve chamar a função deleteUser(12345) e deletar um usuário', () => {
    const id = 12345;

    component.deleteUser(id);

    const req = httpMock.expectOne(`${url}/users/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('Deve chamar a função getUsersWithHeaders()', () => {
    component.getUsersWithHeaders();

    const req = httpMock.expectOne(`${url}/users`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('Deve chamar a função getUsersById(12345) e invocar o serviço', () => {
    const id = 12345;
    const response = {
      name: 'Luiz',
      age: '30',
      email: 'luiz@gmail.com',
      id: '0.9705986481641282',
    };

    component.getUsersById(id);

    spyOn(service, 'getUsersById').and.returnValue(of(response));

    const req = httpMock.expectOne(`${url}/users/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
