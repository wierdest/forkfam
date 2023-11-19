import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgsDoughnutComponent } from './sdgs-doughnut.component';

describe('SdgsDoughnutComponent', () => {
  let component: SdgsDoughnutComponent;
  let fixture: ComponentFixture<SdgsDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgsDoughnutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SdgsDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
