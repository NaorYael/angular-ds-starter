import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroupDirective, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DsInputComponent } from './ds-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DsInputComponent', () => {
  let component: DsInputComponent;
  let fixture: ComponentFixture<DsInputComponent>;
  let mockNgControl: Partial<NgControl>;

  beforeEach(async () => {
    mockNgControl = {
      control: new FormControl(),
      valueAccessor: null,
    };
    await TestBed.configureTestingModule({
      imports: [DsInputComponent, ReactiveFormsModule, FormsModule],
      providers: [FormGroupDirective, { provide: NgControl, useValue: mockNgControl }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DsInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default ids', () => {
    component.id = '';
    component.initIdentifiers();
    expect(component.ids.inputId).toContain('ds-input-0-input');
    expect(component.ids.labelId).toContain('ds-input-0-label');
    expect(component.ids.validationContainerId).toContain('ds-input-0-validation-container');
  });

  it('should initialize with ids', () => {
    component.id = 'test';
    fixture.detectChanges();
    expect(component.ids.inputId).toContain('ds-input-test-input');
    expect(component.ids.labelId).toContain('ds-input-test-label');
    expect(component.ids.validationContainerId).toContain('ds-input-test-validation-container');
  });

  it('should bind control and set value in the input', () => {
    fixture.detectChanges();
    component.control.setValue('test value');
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.value).toBe('test value');
  });

  it('should emit changeEvent when input value changes', () => {
    const emitSpy = jest.spyOn(component.changeEvent, 'emit');
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalledWith(expect.any(Event));
  });

  it('should apply error styles if control is invalid and touched', () => {
    fixture.detectChanges();
    component.control.setValidators(Validators.required);
    component.control.setValue('test value');
    component.control.setValue(null);
    component.control.markAsTouched();
    fixture.detectChanges();
    const labelElement: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.classList).toContain('error-label');
  });

  it('should apply styles based on variant and size', () => {
    component = fixture.componentInstance;
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.className).toContain('small');
  });
});
