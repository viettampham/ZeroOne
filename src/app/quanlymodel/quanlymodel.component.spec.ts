import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlymodelComponent } from './quanlymodel.component';

describe('QuanlymodelComponent', () => {
  let component: QuanlymodelComponent;
  let fixture: ComponentFixture<QuanlymodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanlymodelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanlymodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
