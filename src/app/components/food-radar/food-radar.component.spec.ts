import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRadarComponent } from './food-radar.component';

describe('FoodRadarComponent', () => {
  let component: FoodRadarComponent;
  let fixture: ComponentFixture<FoodRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodRadarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
