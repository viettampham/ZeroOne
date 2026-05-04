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
import { BoPhanResponseModal } from '../model/ResponseModel/BoPhanResponseModal';
import { KhuVucResponseModal } from '../model/ResponseModel/KhuVucResponseModal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RoleResponseModel } from '../model/ResponseModel/RoleResponseModel';
import { UserService } from '../services/currentUser.service';
import { ModelResponseModal } from '../model/ResponseModel/ModelResponseModal';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-quanlymodel',
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
  templateUrl: './quanlymodel.component.html',
  styleUrl: './quanlymodel.component.scss'
})
export class QuanlymodelComponent {
  SearchForm: FormGroup;
  isVisible: boolean = false
  PageIndex = 1;
  PageSize = 10;
  TotalRecords = 0;
  listOfData: ModelResponseModal[] = [];
  titleModal = "";
  FormAddModel: FormGroup;
  dataModel: ModelResponseModal | null = null;

  constructor(private fb: FormBuilder, private api: ApiService, private notification: NzNotificationService,) {
    this.SearchForm = this.fb.group({
      model: "",
    });

    this.FormAddModel = this.fb.group({
      item: ["", Validators.required],
      model: ["", Validators.required],
      loaiModel: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.GetModel();
  }

  GetModel() {
    var request = {
      model: this.SearchForm.value.model,
      pageIndex: this.PageIndex,
      pageSize: this.PageSize
    }
    this.api.GetDSModel(request).subscribe((res: any) => {
      console.log(res);
      this.listOfData = res.data.data;
      this.PageIndex = res.data.pageIndex;
      this.PageSize = res.data.pageSize;
      this.TotalRecords = res.data.totalRecords;
    });
  }

  onPageIndexChange(pageIndex: number): void {
    this.PageIndex = pageIndex;
    this.GetModel();
  }

  onPageSizeChange(pageSize: number): void {
    this.PageSize = pageSize;
    this.GetModel();
  }

  handleCancel() {
    this.isVisible = false;
  }

  cancel() {
    this.notification.info('Hủy bỏ', 'Đã hủy bỏ thao tác');
  }

  modalAddModel() {
    this.isVisible = true;
    this.titleModal = "Thêm mới Model";
    this.FormAddModel.reset();
  }

  EditModel(data: ModelResponseModal) {
    this.isVisible = true;
    this.titleModal = "Cập nhật Model";
    this.dataModel = data;
    this.FormAddModel.patchValue({
      item: data.item,
      model: data.tenModel,
      loaiModel: data.loaiModel
    });
  }

  DeleteModel(id: number) {
    this.api.DeleteModel(id).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        this.notification.success('Thành công', 'Xóa model thành công');
        this.GetModel();
      } else if (res.status == "WARNING") {
        this.notification.warning('Thất bại', res.message);
      } else {
        this.notification.error('Thất bại', 'Xóa model thất bại');
      }
    });
  }

  handleOk() {
    if (this.FormAddModel.invalid) {
      Object.values(this.FormAddModel.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      return;
    }
    if (this.titleModal == "Thêm mới Model") {
      this.api.CreateModel(this.FormAddModel.value).subscribe((res: any) => {
        if (res.status == "SUCCESS") {
          this.notification.success('Thành công', 'Thêm model thành công');
          this.isVisible = false;
          this.GetModel();
        } else if (res.status == "WARNING") {
          this.notification.warning('Thất bại', res.message);
        } else {
          this.notification.error('Thất bại', 'Thêm model thất bại');
        }
      })

    } else if (this.titleModal == "Cập nhật Model") {
      var request = {
        id: this.dataModel?.id,
        item: this.FormAddModel.value.item,
        model: this.FormAddModel.value.model,
        loaiModel: this.FormAddModel.value.loaiModel
      };
      this.api.UpdateModel(request).subscribe((res: any) => {
        if (res.status == "SUCCESS") {
          this.notification.success('Thành công', 'Cập nhật model thành công');
          this.isVisible = false;
          this.GetModel();
        } else if (res.status == "WARNING") {
          this.notification.warning('Thất bại', res.message);
        } else {
          this.notification.error('Thất bại', 'Cập nhật model thất bại');
        }
      });
    }
  }
}
