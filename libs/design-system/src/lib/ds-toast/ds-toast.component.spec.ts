import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsToastComponent } from './ds-toast.component';

describe('DsToastComponent', () => {
  let component: DsToastComponent;
  let fixture: ComponentFixture<DsToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
