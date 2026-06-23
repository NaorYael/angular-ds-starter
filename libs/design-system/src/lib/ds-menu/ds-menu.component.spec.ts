import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsMenuComponent } from './ds-menu.component';

describe('DsMenuComponent', () => {
  let component: DsMenuComponent;
  let fixture: ComponentFixture<DsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
