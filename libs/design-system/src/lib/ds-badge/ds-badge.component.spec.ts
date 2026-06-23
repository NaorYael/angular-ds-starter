import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsBadgeComponent } from './ds-badge.component';

describe('DsBadgeComponent', () => {
  let component: DsBadgeComponent;
  let fixture: ComponentFixture<DsBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
