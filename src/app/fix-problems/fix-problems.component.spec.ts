import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

import { StubComponent } from '../stub/stub.component';
import { FixProblemsComponent } from './fix-problems.component';

describe('FixProblemsComponent', () => {
  let component: FixProblemsComponent;
  let fixture: ComponentFixture<FixProblemsComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [FixProblemsComponent],
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FixProblemsComponent);
    component = fixture.componentInstance;
    // dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>; OU ==>
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir a caixa de diálogo quando openDialog for chamado', () => {
    component.openDialog();

    expect(dialog.open).toHaveBeenCalledWith(StubComponent, {
      width: '250px',
      data: {},
    });
  });
});
