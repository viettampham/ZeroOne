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
import { CongDoanResponse } from '../model/ResponseModel/CongDoanResponse';
import { MayResponseModal } from '../model/ResponseModel/MayResponseModal';
import { CheckSheetResponseModal } from '../model/ResponseModel/CheckSheetResponseModal';

@Component({
  selector: 'app-quan-ly-check-sheet',
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
  templateUrl: './quan-ly-check-sheet.component.html',
  styleUrl: './quan-ly-check-sheet.component.scss'
})
export class QuanLyCheckSheetComponent {
  @Input() data: string = '';
  congdoanOptions: CongDoanResponse[] = [];
  khuvucOptions: KhuVucResponseModal[] = [];
  SearchForm: FormGroup;
  CurrentUser: any;
  mayOptions: MayResponseModal[] = [];
  checkSheetOptions: any[] = [];
  loaiCSOptions: string[] = [];
  titleModal: string = "";
  isVisible: boolean = false;

  RoleSPAdmin: boolean = false;

  PageIndex = 1;
  PageSize = 10;
  TotalRecords = 0;
  listOfData: CheckSheetResponseModal[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private userService: UserService, private notification: NzNotificationService) {
    this.SearchForm = this.fb.group({
      khuVuc: [""],
      loaiCheckSheet: [""],
      tenCheckSheet: [""],
      tenCongDoan: [""],
      tenmay: [""]
    })
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.CurrentUser = user;
      if (this.CurrentUser.CapBacRole == 1) {
        this.RoleSPAdmin = true;
      }
      this.GetLoaiCS();
      this.GetKhuVuc();
      this.GetCheckSheet();
    });
  }

  GetLoaiCS() {
    this.api.GetLoaiCS().subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        this.loaiCSOptions = res.listData;
      }
    });
  }


  GetKhuVuc() {
    this.api.GetKhuVucByRole().subscribe((res: any) => {
      this.khuvucOptions = res.listData;
      this.SearchForm.patchValue({
        khuVuc: this.CurrentUser.KhuVuc
      });
      this.GetCongDoanByKhuVuc();
    });
  }

  GetCongDoanByKhuVuc() {
    this.api.GetCBCongDoanByKhuVuc(this.SearchForm.value.khuVuc).subscribe((res: any) => {
      if (res.Status = "SUCCESS") {
        this.congdoanOptions = res.listData;
        this.GetCheckSheet();
      }
    });
  }

  GetMayByCD() {
    var req = {
      pageIndex: 0,
      pageSize: 0,
      tenmay: "",
      tenCongDoan: this.SearchForm.value.tenCongDoan,
      khuVuc: this.SearchForm.value.khuVuc
    };
    this.api.GetMayNoPaging(req).subscribe((res: any) => {
      this.mayOptions = res.listData;
      this.GetCheckSheet();
    });
  }

  GetCheckSheet() {
    var req = {
      pageIndex: this.PageIndex,
      pageSize: this.PageSize,
      tenCheckSheet: this.SearchForm.value.tenCheckSheet,
      tenCongDoan: this.SearchForm.value.tenCongDoan,
      khuVuc: this.SearchForm.value.khuVuc,
      tenmay: this.SearchForm.value.tenmay,
      loaiCheckSheet: this.SearchForm.value.loaiCheckSheet
    };
    this.api.SearchCheckSheet(req).subscribe((res: any) => {
      if (res.status === "SUCCESS") {
        this.listOfData = res.data.data;
        this.TotalRecords = res.data.totalRecords;
        this.PageIndex = res.data.pageIndex;
        this.PageSize = res.data.pageSize;
      }
    });
  }
  modalAddCS() {

  }
  EditCheckSheet(data: CheckSheetResponseModal) {
    // Implementation for editing check sheet
  }
  DeleteCheckSheet(id: number) {
    this.api.DeleteCheckSheet(id).subscribe((res: any) => {
      if (res.status === "SUCCESS") {
        this.notification.success('Thành công', res.Message);
        this.GetCheckSheet();
      }else
      {
        this.notification.error('Thất bại', res.Message);
      }
    });
  }
  cancel() {

  }
  onPageIndexChange(event: number) {
    this.PageIndex = event;
    this.GetCheckSheet();
  }
  onPageSizeChange(event: number) {
    this.PageSize = event;
    this.PageIndex = 1;
    this.GetCheckSheet();
  }
}
