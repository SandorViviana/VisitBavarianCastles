import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastleDetailsComponent } from './castle-details.component';

describe('CastleDetailsComponent', () => {
  let component: CastleDetailsComponent;
  let fixture: ComponentFixture<CastleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
