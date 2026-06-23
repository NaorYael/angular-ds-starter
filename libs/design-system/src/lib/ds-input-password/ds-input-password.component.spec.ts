import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsInputPasswordComponent } from './ds-input-password.component';

describe('DsInputPasswordComponent', () => {
  let component: DsInputPasswordComponent;
  let fixture: ComponentFixture<DsInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsInputPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
