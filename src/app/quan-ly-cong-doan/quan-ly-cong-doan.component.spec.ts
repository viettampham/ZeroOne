import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyCongDoanComponent } from './quan-ly-cong-doan.component';

describe('QuanLyCongDoanComponent', () => {
  let component: QuanLyCongDoanComponent;
  let fixture: ComponentFixture<QuanLyCongDoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyCongDoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyCongDoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
