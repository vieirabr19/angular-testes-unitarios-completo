import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MyServiceService } from './my-service.service';

const myServiceResponse = [
  {
    name: 'Danilo 2',
    email: 'danilo@gmail.com',
    age: '30',
    id: 1,
  },
  {
    id: 3,
    name: 'Joao',
    email: 'joao@gmail.com',
    age: 22,
  },
  {
    id: 4,
    name: 'Joao',
    email: 'joao@gmail.com',
    age: 22,
  },
  {
    id: 0.8230837961873159,
    name: 'Danilo ',
    email: 'danilo@gmail.com',
    age: '30',
  },
];

class MyServiceMock extends MyServiceService {
  override getUsers() {
    return of(myServiceResponse);
  }
}

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MyServiceService,
          useClass: MyServiceMock,
        },
      ],
    });

    service = TestBed.inject(MyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada HTTP', () => {
    service.getUsers().subscribe((res) => {
      expect(res).toEqual(myServiceResponse);
    });
  });
});
