import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyMayComponent } from './quan-ly-may.component';

describe('QuanLyMayComponent', () => {
  let component: QuanLyMayComponent;
  let fixture: ComponentFixture<QuanLyMayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyMayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyMayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
