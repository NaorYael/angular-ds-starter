import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroupDirective, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DsCheckboxComponent } from './ds-checkbox.component';

describe('DsCheckboxComponent', () => {
  let component: DsCheckboxComponent;
  let fixture: ComponentFixture<DsCheckboxComponent>;

  const mockNgControl: Partial<NgControl> = {
    control: new FormControl(),
    valueAccessor: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [FormGroupDirective, { provide: NgControl, useValue: mockNgControl }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DsCheckboxComponent, {
        set: {
          template: `<p>Mock Template</p>`,
          styleUrls: [],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DsCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle change events properly', () => {
    const mockEvent = {
      originalEvent: { preventDefault: jest.fn() },
      stopPropagation: jest.fn(),
    } as any;

    const emitSpy = jest.spyOn(component.changeEvent, 'emit');
    const stopPropagationSpy = jest.spyOn(component, 'stopPropagation');

    component.onChangeEvent(mockEvent);

    expect(mockEvent.originalEvent.preventDefault).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalledWith(mockEvent);
    expect(emitSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should have the correct baseStyleClass', () => {
    expect(component.baseStyleClass).toBe('ds-checkbox');
  });

  it('should bind [id] to ids.hostContainerId', () => {
    component['ids'] = { hostContainerId: 'test-id' } as any;

    fixture.detectChanges();

    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.getAttribute('id')).toBe('ds-checkbox-0-container');
  });
});
