import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FixProblemsService } from './fix-problems.service';

describe('FixProblemsService', () => {
  let service: FixProblemsService;
  let httpMock: HttpTestingController;
  let url: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FixProblemsService);
    httpMock = TestBed.inject(HttpTestingController);
    url = 'http://localhost:3000';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada GET para obter usuarios', () => {
    const response = [
      {
        id: 1,
        name: 'Carlos',
        email: 'carlos@gmail.com',
        age: 30,
      },
    ];

    service.getUsers().subscribe((res) => {
      expect(res).toBe(response);
    });

    const req = httpMock.expectOne(`${url}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
