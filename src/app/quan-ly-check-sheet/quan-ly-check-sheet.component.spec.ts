import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyCheckSheetComponent } from './quan-ly-check-sheet.component';

describe('QuanLyCheckSheetComponent', () => {
  let component: QuanLyCheckSheetComponent;
  let fixture: ComponentFixture<QuanLyCheckSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyCheckSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyCheckSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
