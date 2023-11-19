import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgsIconsComponent } from './sdgs-icons.component';

describe('SdgsIconsComponent', () => {
  let component: SdgsIconsComponent;
  let fixture: ComponentFixture<SdgsIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgsIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SdgsIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
