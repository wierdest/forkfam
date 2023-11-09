import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingTogetherComponent } from './eating-together.component';

describe('EatingTogetherComponent', () => {
  let component: EatingTogetherComponent;
  let fixture: ComponentFixture<EatingTogetherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EatingTogetherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EatingTogetherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
