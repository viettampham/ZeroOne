import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NhanVienResponse } from '../model/ResponseModel/NhanVienResponse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ApiService } from '../services/api.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormControl, FormBuilder, FormGroup, Validators, NonNullableFormBuilder,ReactiveFormsModule  } from '@angular/forms';
const icons = [PlusOutline];
@Component({
  selector: 'app-quan-ly-nhan-vien',
  standalone: true,
  imports: [
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzPaginationModule,
    NzModalModule,
    ReactiveFormsModule,
  ],
  templateUrl: './quan-ly-nhan-vien.component.html',
  styleUrl: './quan-ly-nhan-vien.component.scss',
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class QuanLyNhanVienComponent {
  FormAddNhanVien: FormGroup;

  constructor(private api: ApiService, private formBuilder: FormBuilder, ) {
    this.FormAddNhanVien = this.formBuilder.group({
        Code: ['', [Validators.required]],
        UserName: ['', [Validators.required]],
        Password: ['', [Validators.required]],
        BoPhan: ['', [Validators.required]],
        GhiChu: ['']
      });
  }
  titleModal = 'Thêm nhân viên';
  isVisible = false;
  checked = false;
  loading = false;
  indeterminate = false;
  PageIndex = 1;
  PageSize = 10;
  TotalRecords = 0;
  rangeTemplate = (total: number) => {
    return `Total: ${total}`;
  };

  listOfData: NhanVienResponse[] = [];

  ngOnInit(): void {
    this.GetNhanVien();
  }

  GetNhanVien() {
    var request = {
      PageIndex: this.PageIndex,
      PageSize: this.PageSize,
      Keyword: ''
    };
    this.api.GetNhanVien(request).subscribe((res: any) => {
      this.listOfData = res.data.data;
      console.log(this.listOfData);
      this.PageIndex = res.data.pageIndex;
      this.PageSize = res.data.pageSize;
      this.TotalRecords = res.data.totalRecords;
    });
  }

  onChecked(id: number, event: any) {

  }

  onCheckedAll(event: any) {

  }

  onPageIndexChange(pageIndex: number): void {
    this.PageIndex = pageIndex;
    console.log('PageIndex:', pageIndex);
    this.GetNhanVien();
  }

  onPageSizeChange(pageSize: number): void {
    this.PageSize = pageSize;
    console.log('PageSize:', pageSize);
    this.GetNhanVien();
  }

  modalAddNV(){
    this.isVisible = true;
  }

  handleCancel(){
    this.isVisible = false;
    
  }

  handleOk(){
    this.isVisible = false;

  }

  handleAdd(){
    
  }

}

