import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SpyonServiceService } from './spyon-service.service';

describe('SpyonServiceService', () => {
  let service: SpyonServiceService;
  const logger = jasmine.createSpy('log');
  const status = jasmine.createSpyObj('service', ['name', 'age', 'email']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SpyonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar uma lista de usuarios', () => {
    const response = [
      { name: 'Danilo', age: 30, email: 'danilodev.silva@gmail.com' },
      { name: 'Jose', age: 40, email: 'jose.silva@gmail.com' },
      { name: 'Maria', age: 22, email: 'maria.silva@gmail.com' },
    ];

    spyOn(service, 'getUsers').and.returnValue(of(response));

    service.getUsers().subscribe((res) => {
      expect(res).toEqual(response);
    });
  });

  it('Deve criar método com jasmine.createSpy', () => {
    logger('Logou no sistema');
    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledWith('Logou no sistema');
  });

  it('Deve criar método com jasmine.createSpyObj', () => {
    status.name('Luiz');
    status.email('luiz@gmail.com');
    status.age('30');

    expect(status.name).toHaveBeenCalledTimes(1);
    expect(status.name).toHaveBeenCalledWith('Luiz');
    expect(status.email).toHaveBeenCalledTimes(1);
    expect(status.email).toHaveBeenCalledWith('luiz@gmail.com');
    expect(status.age).toHaveBeenCalledTimes(1);
    expect(status.age).toHaveBeenCalledWith('30');
  });
});
