import { Component, Input, OnInit } from '@angular/core';
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
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UserService } from '../services/currentUser.service';
import { ModelResponseModal } from '../model/ResponseModel/ModelResponseModal';
import { CongDoanResponse } from '../model/ResponseModel/CongDoanResponse';
import { KhuVucResponseModal } from '../model/ResponseModel/KhuVucResponseModal';

@Component({
  selector: 'app-quan-ly-cong-doan',
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
    NzPopconfirmModule],
  templateUrl: './quan-ly-cong-doan.component.html',
  styleUrl: './quan-ly-cong-doan.component.scss'
})
export class QuanLyCongDoanComponent {
  SearchForm: FormGroup;
  isVisible: boolean = false
  PageIndex = 1;
  PageSize = 10;
  TotalRecords = 0;
  listOfData: CongDoanResponse[] = [];
  CurrentUser: any;
  titleModal = "";
  FormAddCongDoan: FormGroup;
  khuvucOption: KhuVucResponseModal[] = [];
  ConDoan: CongDoanResponse | null = null;
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.CurrentUser = user;
      this.GetCongDoan();
    });

  }

  constructor(private fb: FormBuilder, private api: ApiService, private userService: UserService, private notification: NzNotificationService) {
    this.SearchForm = this.fb.group({
      tenCongDoan: [""]
    });

    this.FormAddCongDoan = this.fb.group({
      tenCongDoan: ["", Validators.required],
      ghiChu: [""],
      khuVuc: ["", Validators.required]
    });
  }

  GetCongDoan() {
    var req = {
      pageIndex: this.PageIndex,
      pageSize: this.PageSize,
      tenCongDoan: this.SearchForm.value.tenCongDoan,
      khuVuc: this.CurrentUser.KhuVuc
    };

    this.api.GetCongDoan(req).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        this.listOfData = res.data.data;
        this.TotalRecords = res.data.totalRecords;
        this.PageIndex = res.data.pageIndex;
        this.PageSize = res.data.pageSize;
      } else {
        this.notification.error("Lỗi", res.message);
      }
    });

  }

  modalAddCongDoan() {
    this.isVisible = true;
    this.FormAddCongDoan.reset({
      tenCongDoan: "",
      ghiChu: "",
      khuVuc: ""
    });
    this.titleModal = "Thêm Công Đoạn";
    this.GetKhuVucByBoPhan(this.CurrentUser.BoPhan);
  }

  onPageIndexChange(pageIndex: number): void {
    this.PageIndex = pageIndex;
    this.GetCongDoan();
  }

  onPageSizeChange(pageSize: number): void {
    this.PageSize = pageSize;
    this.GetCongDoan();
  }

  cancel() {
    this.isVisible = false;
  }

  DeleteCongDoan(id: number) {
    this.api.DeleteCongDoan(id).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        this.notification.success("Thành công", res.message);
        this.isVisible = false;
        this.GetCongDoan();
      } else {
        this.notification.error("Lỗi", res.message);
      }
    });
  }

  EditCongDoan(data: CongDoanResponse) {
    this.isVisible = true;
    this.titleModal = "Chỉnh sửa Công Đoạn";
    this.FormAddCongDoan.patchValue({
      tenCongDoan: data.tenCongDoan,
      ghiChu: data.ghiChu,
    });
    this.ConDoan = data;
    this.GetKhuVucByBoPhan(this.CurrentUser.BoPhan);
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.FormAddCongDoan.invalid) {
      Object.values(this.FormAddCongDoan.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      return;
    }

    if (this.titleModal == "Thêm Công Đoạn") {
      this.api.CreateCongDoan(this.FormAddCongDoan.value).subscribe((res: any) => {
        if (res.status == "SUCCESS") {
          this.notification.success('Thành công', 'Thêm công đoạn thành công');
          this.isVisible = false;
          this.GetCongDoan();
        } else if (res.status == "WARNING") {
          this.notification.warning(res.status, res.message);
        } else {
          this.notification.error(res.status, res.message);
        }
      });
    }else if (this.titleModal == "Chỉnh sửa Công Đoạn") {
      var req = {
        id: this.ConDoan?.id,
        tenCongDoan: this.FormAddCongDoan.value.tenCongDoan,
        ghiChu: this.FormAddCongDoan.value.ghiChu,
        khuVuc: this.FormAddCongDoan.value.khuVuc
      };

      this.api.UpdateCongDoan(req).subscribe((res: any) => {
        if (res.status == "SUCCESS") {
          this.notification.success('Thành công', 'Cập nhật công đoạn thành công');
          this.isVisible = false;
          this.GetCongDoan();
        } else if (res.status == "WARNING") {
          this.notification.warning(res.status, res.message);
        } else {
          this.notification.error(res.status, res.message);
        }
      });
    }
  }

  GetKhuVucByBoPhan(bophan: string) {
    this.khuvucOption = [];
    this.api.GetKhuVuc(bophan).subscribe((res: any) => {
      this.khuvucOption = res.listData;
      this.FormAddCongDoan.patchValue({
        khuVuc: this.CurrentUser.KhuVuc
      });
    });
  }
}
