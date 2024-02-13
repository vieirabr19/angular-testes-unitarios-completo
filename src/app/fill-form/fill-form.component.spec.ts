import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { FillFormComponent } from './fill-form.component';

describe('FillFormComponent', () => {
  let component: FillFormComponent;
  let fixture: ComponentFixture<FillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FillFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve preencher campos do formulário', () => {
    let input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Luiz';
    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('Luiz');
  });

  it('Deve chamar a função fillForm', () => {
    component.name = 'Luiz';

    component.fillForm();

    expect(component.name).toBe('Luiz');
  });
});
