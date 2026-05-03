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

  constructor(private fb: FormBuilder, private api: ApiService, private notification: NzNotificationService,) {
    this.SearchForm = this.fb.group({
      model: "",
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
    this.api.GetDSModel(request).subscribe((res:any) => {
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


  }

  EditModel(data: ModelResponseModal) {

  }

  DeleteModel(id: number) {

  }
}
