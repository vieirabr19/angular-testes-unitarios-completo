import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  let url: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
    url = 'http://localhost:3000';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada POST para obter login', () => {
    const payload = {
      email: 'carlos@gmail.com',
      password: '12345',
    };
    const response = [
      {
        id: 1,
        name: 'Carlos',
        email: 'carlos@gmail.com',
        age: 30,
      },
    ];

    service.login(payload).subscribe((res) => {
      expect(res).toBe(response);
    });

    const req = httpMock.expectOne(`${url}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('Deve realizar chamada GET para obter usuarios', () => {
    const response = [
      {
        id: 1,
        name: 'Carlos',
        email: 'carlos@gmail.com',
        age: 30,
      },
      {
        id: 2,
        name: 'Julia',
        email: 'julia@gmail.com',
        age: 18,
      },
      {
        id: 3,
        name: 'Marina',
        email: 'marina@gmail.com',
        age: 22,
      },
    ];

    service.getUsers().subscribe((res) => {
      expect(res).toBe(response);
    });

    const request = httpMock.expectOne(`${url}/users`);
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users`);
    request.flush(response);
  });

  it('Deve gerar erro ao obter usuários', () => {
    service.getUsers().subscribe({
      error: (erro) => {
        expect(erro.status).toBe(500);
      },
    });

    const request = httpMock.expectOne(`${url}/users`);

    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users`);
    request.flush(500, {
      status: 500,
      statusText: 'Erro de rede',
    });
  });

  it('Deve realizar chamada GET por ID', () => {
    const response = { name: 'Luiz', email: 'luiz@teste.com', age: '30' };
    const id = 3;

    service.getUsersById(id).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const request = httpMock.expectOne(`${service.url}/users/${id}`);

    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users/${id}`);
    request.flush(response);
  });

  // it('Deve chamar a isAuthenticated() e rerornar uma Promise(true) resolvida', async () => {
  //   const result = await service.isAuthenticated();

  //   expect(result).toBe(true);
  // });

  it('Deve chamar a isAuthenticated() e rerornar uma Promise(true) resolvida', (done: DoneFn) => {
    service
      .isAuthenticated()
      .then((res) => {
        expect(res).toBe(true);
        done();
      })
      .catch((err) => {
        done.fail(err);
      });
  });

  it('Deve fazer requisição POST para cadastrar usuario', () => {
    const user = {
      id: 0.18013741332928745,
      name: 'Neide',
      email: 'neide@gmail.com',
      age: '40',
    };

    service.postUser(user).subscribe((res) => {
      expect(res).toBe(user);
    });

    const request = httpMock.expectOne(`${url}/users`);
    expect(request.request.method).toBe('POST');
    request.flush(user);
  });

  it('Deve atualizar usuario PUT', () => {
    const id = 1;
    const user = {
      name: 'Neide',
      email: 'neide@gmail.com',
      age: '40',
    };

    service.putUser(id, user).subscribe((res) => {
      expect(res).toBe(user);
    });

    const request = httpMock.expectOne(`${url}/users/${id}`);
    expect(request.request.method).toBe('PUT');
    request.flush(user);
  });

  it('Deve excluir usuário "DELETE"', () => {
    const id = 2;
    const response = {};

    service.deleteUser(id).subscribe((res) => {
      expect(res).toBe(response);
    });

    const request = httpMock.expectOne(`${url}/users/${id}`);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.url).toBe(`${url}/users/${id}`);
    request.flush(response);
  });

  it('Deve conter headers na requisição', () => {
    service.getUserWithHeaders().subscribe();

    const request = httpMock.expectOne(`${url}/users`);

    expect(request.request.headers.has('content-type')).toEqual(true);
    expect(request.request.headers.has('Authorization')).toEqual(true);
  });

  it('Deve retornar usuários com promise', () => {
    const response = [
      { id: 1, name: 'Luiz', email: 'luiz@teste.com', password: '12345' },
      { id: 2, name: 'Vieira', email: 'vieira@teste.com', password: '67890' },
    ];

    service.getUsersWithPromise().then((users) => {
      expect(users).toBe(response);
    });

    const req = httpMock.expectOne(`${url}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('Deve tratar erro ao buscar usuários', () => {
    const errorMessage = 'Erro ao buscar usuários';
    const status = 500;

    service.getUsersWithPromise().catch((err) => {
      expect(err.status).toBe(status);
      expect(err.error).toBe(errorMessage);
    });

    const req = httpMock.expectOne(`${url}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, {
      status,
      statusText: 'Erro do servidor interno!',
    });
  });
});
