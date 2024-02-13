import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { MyServiceService } from '../service/my-service.service';
import { MockServiceComponent } from './mock-service.component';

describe('MockServiceComponent', () => {
  let component: MockServiceComponent;
  let fixture: ComponentFixture<MockServiceComponent>;
  let service: MyServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockServiceComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MockServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MyServiceService);
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
    // <== OU ==>
    // service.getUsers().subscribe((res) => {
    //   expect(res).toEqual(response);
    // });
  });
});
