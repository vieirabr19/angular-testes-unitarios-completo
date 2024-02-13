import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { of } from 'rxjs';
import { HttpService } from '../service/http.service';
import { FormLoginComponent } from './form-login.component';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLoginComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve retornar se o formulário é inválido', () => {
    const isForm = component.isValidForm();
    expect(isForm).toBe(false);
  });

  it('Deve retornar se o formulário é válido', () => {
    component.form.controls['email'].setValue('teste@teste.com');
    component.form.controls['password'].setValue('12345');

    const isForm = component.isValidForm();
    expect(isForm).toBe(true);
  });

  it('Deve estar desabilitado o botão quando o formulário for inválido', () => {
    const button = fixture.debugElement.nativeElement;

    expect(button.querySelector('.btn-login').disabled).toBeTrue();
  });

  it('Deve estar habilitado o botão quando o formulário for válido', () => {
    component.form.controls['email'].setValue('teste@teste.com');
    component.form.controls['password'].setValue('12345');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement;

    expect(button.querySelector('.btn-login').disabled).toBeFalse();
  });

  it('Deve retornar o valor de um controle de fomrulário', () => {
    component.form = new FormGroup({
      email: new FormControl('luiz@teste.com'),
      password: new FormControl('12345'),
    });

    const result = component.getValueControl(component.form, 'password');

    expect(result).toEqual('12345');
  });

  it('Deve criar payload para submeter a API', () => {
    const payload = {
      email: 'luiz@teste.com',
      password: '12345',
    };

    expect(component.createPayload('luiz@teste.com', '12345')).toEqual(payload);
  });

  it('Deve realizar requisição para a API de Login', () => {
    component.form.controls['email'].setValue('teste@teste.com');
    component.form.controls['password'].setValue('12345');

    const response = {
      email: 'luiz@teste.com',
      password: '12345',
      id: 1,
    };

    const spy = spyOn(service, 'login').and.returnValue(of(response));

    component.isValidForm();
    component.login();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Deve da console.log do formulario', () => {
    spyOn(console, 'log');

    component.onClick();

    expect(console.log).toHaveBeenCalledWith(component.form);
  });
});
