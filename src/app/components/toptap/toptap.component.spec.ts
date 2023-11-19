import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptapComponent } from './toptap.component';

describe('ToptapComponent', () => {
  let component: ToptapComponent;
  let fixture: ComponentFixture<ToptapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToptapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToptapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
