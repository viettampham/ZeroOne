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
import { MayResponseModal } from '../model/ResponseModel/MayResponseModal';

@Component({
  selector: 'app-quan-ly-may',
  standalone: true,
  imports: [NzInputModule,
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
  templateUrl: './quan-ly-may.component.html',
  styleUrl: './quan-ly-may.component.scss'
})
export class QuanLyMayComponent {
  @Input() data: string = '';
  CurrentUser: any;
  SearchForm: FormGroup;
  isVisible: boolean = false
  PageIndex = 1;
  PageSize = 10;
  TotalRecords = 0;
  listOfData: MayResponseModal[] = [];
  congdoanOption: CongDoanResponse[] = [];
  khuvucOption: KhuVucResponseModal[] = [];
  constructor(private fb: FormBuilder, private api: ApiService, private userService: UserService, private notification: NzNotificationService) {
    this.SearchForm = this.fb.group({
      tenMay: [""],
      tenCongDoan: [""],
      khuVuc: [""]
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.data = user;
      this.CurrentUser = user;
      this.GetKhuVuc();
      this.GetCongDoan();
    });
  }

  GetKhuVuc() {
    this.api.GetKhuVucByRole().subscribe((res: any) => {
      this.khuvucOption = res.listData;
    });
  }

  GetCongDoan() {
    console.log(this.SearchForm.value);

    this.api.GetCBCongDoanByKhuVuc(this.SearchForm.value.khuVuc).subscribe((res: any) => {
      if (res.Status = "SUCCESS") {
        this.congdoanOption = res.listData;
      }
    });
  }

  GetMDSMay() {
    const req = {
      pageIndex: this.PageIndex,
      pageSize: this.PageSize,
      tenmay: this.SearchForm.value.tenMay,
      tenCongDoan: this.SearchForm.value.tenCongDoan,
      khuVuc: this.SearchForm.value.khuVuc
    }
    this.api.GetMDSMay(req).subscribe((res: any) => {
      if (res.Status = "SUCCESS") {
        this.listOfData = res.data.data;
        this.PageIndex = res.data.pageIndex;
        this.PageSize = res.data.pageSize;
        this.TotalRecords = res.data.totalRecords;
      }
    });
  }

  modalAddMay() {

  }

  EditMay(data: MayResponseModal) {
    
  }

  DeleteMay(id: number){
    console.log(id);
    this.api.DeleteMay(id).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        this.notification.success('Thành công', 'Xóa máy thành công');
        this.GetMDSMay();
      } else {
        this.notification.error(res.status, res.message);
      }
    });
  }

  cancel(){
    
  }

  onPageIndexChange(event: number) {
    this.PageIndex = event;
    this.GetMDSMay();
  }
  onPageSizeChange(event: number) {
    this.PageSize = event;
    this.GetMDSMay();
  }

}
