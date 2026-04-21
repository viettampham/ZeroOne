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
import { FormControl, FormBuilder, FormGroup, Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzFormDirective } from "ng-zorro-antd/form";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BoPhanResponseModal } from '../model/ResponseModel/BoPhanResponseModal';
import { KhuVucResponseModal } from '../model/ResponseModel/KhuVucResponseModal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


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
    NzFormDirective,
    NzSelectModule,
    NzFormModule,
    NzNotificationModule,
    NzPopconfirmModule
  ],
  templateUrl: './quan-ly-nhan-vien.component.html',
  styleUrl: './quan-ly-nhan-vien.component.scss',
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class QuanLyNhanVienComponent {
  FormAddNhanVien: FormGroup;
  SearchForm: FormGroup;
  bophanOptions: BoPhanResponseModal[] = [];
  khuvucOption: KhuVucResponseModal[] = [];
  constructor(private api: ApiService, private formBuilder: FormBuilder, private notification: NzNotificationService) {
    this.FormAddNhanVien = this.formBuilder.group({
      Code: ['', [Validators.required]],
      Hoten: ['', [Validators.required]],
      Bophan: [null, [Validators.required]],
      KhuVuc: [null, [Validators.required]],
      Ghichu: ['']
    });

    this.SearchForm = this.formBuilder.group({
      code: "",
      hoten: "",
      bophan: ""
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

  action = ""; // hành động hiện tại: "add" hoặc "edit"
  dataNhanVienEdit: NhanVienResponse | null = null; // lưu thông tin nhân viên đang được chỉnh sửa
  
  rangeTemplate = (total: number) => {
    return `Total: ${total}`;
  };

  listOfData: NhanVienResponse[] = [];

  ngOnInit(): void {
    this.GetNhanVien();
  }

  loadBoPhan() {
    this.api.GetBoPhan().subscribe((res: any) => {
      this.bophanOptions = res.listData;
    });
  }

  GetKhuVuc(event: any) {
    this.GetKhuVucByBoPhan(this.FormAddNhanVien.value.Bophan);
  }

  GetKhuVucByBoPhan(bophan: string) {
    this.api.GetKhuVuc(bophan).subscribe((res: any) => {
      this.khuvucOption = res.listData;
    });
  }

  GetNhanVien() {
    var request = {
      PageIndex: this.PageIndex,
      PageSize: this.PageSize,
      Code: this.SearchForm.value.code,
      Hoten: this.SearchForm.value.hoten,
      BoPhan: this.SearchForm.value.bophan
    };
    this.api.GetNhanVien(request).subscribe((res: any) => {
      this.listOfData = res.data.data;
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
    this.GetNhanVien();
  }

  onPageSizeChange(pageSize: number): void {
    this.PageSize = pageSize;
    this.GetNhanVien();
  }

  modalAddNV() {
    this.isVisible = true;
    this.action = "add";
    this.FormAddNhanVien.reset();
    this.loadBoPhan();
  }

  handleCancel() {
    this.isVisible = false;

  }

  handleOk() {
    if (this.FormAddNhanVien.invalid) {
      Object.values(this.FormAddNhanVien.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      return; 
    }
    if(this.action == "add"){
      this.api.CreateNhanVien(this.FormAddNhanVien.value).subscribe((res: any) => {
        if (res.status == "SUCCESS") {
          this.notification.success('Thành công', 'Thêm nhân viên thành công');
          this.GetNhanVien();
        }else if (res.status == "WARNING"){
          this.notification.warning(res.status, res.message);
        }else{
          this.notification.error(res.status, res.message);
        }
      });
    this.isVisible = false;
    }else if(this.action == "edit"){
      var request = {
        id: this.dataNhanVienEdit?.id,
        code: this.FormAddNhanVien.value.Code,
        userName: this.FormAddNhanVien.value.Hoten,
        boPhan: this.FormAddNhanVien.value.Bophan,
        khuVuc: this.FormAddNhanVien.value.KhuVuc,
        ghiChu: this.FormAddNhanVien.value.Ghichu,
        isActive: this.dataNhanVienEdit?.isActive,
      };
      this.api.UpdateNhanVien(request).subscribe((res: any) => {
        if (res.status == "SUCCESS") {
          this.isVisible = false;
          this.notification.success('Thành công', 'Cập nhật nhân viên thành công');
          this.GetNhanVien();
        } else if (res.status == "WARNING") {
          this.notification.warning(res.status, res.message);
        } else {
          this.notification.error(res.status, res.message);
        }
      });
    }
  }

  DeleteNhanVien(id: number) {
    this.api.DeleteNhanVien(id).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        this.notification.success('Thành công', 'Xóa nhân viên thành công');
        this.GetNhanVien();
      } else {
        this.notification.error(res.status, res.message);
      }
    });
  }

  cancel(){
    this.notification.info('Hủy bỏ', 'Đã hủy bỏ thao tác');
  }

  EditNhanVien(data: NhanVienResponse){
    this.dataNhanVienEdit = data;
    this.action = "edit";
    this.isVisible = true;
    this.titleModal = 'Cập nhật nhân viên';
    this.loadBoPhan();

    this.FormAddNhanVien.patchValue({
      Code: data.code,
      Hoten: data.userName,
      Bophan: data.boPhan,
      PhongBan: data.boPhan,
      Ghichu: data.ghiChu,
      // KhuVuc: data.khuVuc
    });
    
    this.GetKhuVucByBoPhan(data.boPhan);

    this.FormAddNhanVien.patchValue({
        KhuVuc: data.khuVuc
      });
  }
}

