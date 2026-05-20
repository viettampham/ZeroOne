import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { LoginResponse } from '../model/ResponseModel/LoginResponse';
import { LoginRequest } from '../model/RequestModel/LoginRequest';
import { CommonResponseModal } from '../model/ResponseModel/CommonResponseModal';
import { NhanVienResponse } from '../model/ResponseModel/NhanVienResponse';
import { GetNhanVienRequest } from '../model/RequestModel/GetNhanVienRequest';
import { PagingResponse } from '../model/ResponseModel/PagingResponse';
import { BoPhanResponseModal } from '../model/ResponseModel/BoPhanResponseModal';
import { RoleResponseModel } from '../model/ResponseModel/RoleResponseModel';
import { ModelResponseModal } from '../model/ResponseModel/ModelResponseModal';
import { CongDoanResponse } from '../model/ResponseModel/CongDoanResponse';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpCLient: HttpClient) {}

  Login=(request : LoginRequest)=>{
    return this.httpCLient.post<LoginResponse>(`${environment.api_domain}/NhanVien/authentication`,request);
  }

  GetNhanVien=(request: GetNhanVienRequest)=>{
    return this.httpCLient.post<CommonResponseModal<PagingResponse<NhanVienResponse>>>(`${environment.api_domain}/NhanVien/get-ds`,request);
  }

  GetBoPhan=()=>{
    return this.httpCLient.get<CommonResponseModal<BoPhanResponseModal[]>>(`${environment.api_domain}/NhanVien/get-phongban`);
  }

  GetKhuVuc=(phongban: string)=>{
    return this.httpCLient.get(`${environment.api_domain}/NhanVien/get-khuvuc?phongban=${phongban}`); 
  }

  GetKhuVucByRole=()=>{
    return this.httpCLient.get(`${environment.api_domain}/NhanVien/get-khuvuc`); 
  }
  

  CreateNhanVien=(request: any)=>{
    return this.httpCLient.post(`${environment.api_domain}/NhanVien/create-nhan-vien`,request);
  }

  DeleteNhanVien=(id: number)=>{
    return this.httpCLient.delete(`${environment.api_domain}/NhanVien/delete-nhan-vien/${id}`);
  }

  GetNhanVienByID=(id: number)=>{
    return this.httpCLient.get(`${environment.api_domain}/NhanVien/get-nhanvien-byid/${id}`);
  }

  UpdateNhanVien=(request: any)=>{
    return this.httpCLient.post(`${environment.api_domain}/NhanVien/update-nhan-vien`,request);
  }

  GetRole=()=>{
    return this.httpCLient.get<CommonResponseModal<RoleResponseModel[]>>(`${environment.api_domain}/NhanVien/get-role`);
  }

  ChangePassword=(request: any)=>{
    return this.httpCLient.post(`${environment.api_domain}/NhanVien/change-password-admin`,request);
  }

  GetDSModel=(req:any)=>{
    return this.httpCLient.post<CommonResponseModal<PagingResponse<ModelResponseModal>>>(`${environment.api_domain}/Model/get-model`,req);
  }

  CreateModel=(req:any)=>{
    return this.httpCLient.post(`${environment.api_domain}/Model/create-model`,req);
  }

  DeleteModel=(id: number)=>{
    return this.httpCLient.delete(`${environment.api_domain}/Model/delete?id=${id}`);
  }
  
  UpdateModel=(req: any)=>{
    return this.httpCLient.post(`${environment.api_domain}/Model/update-model`,req);
  }

  GetCongDoan=(req:any)=>{
    return this.httpCLient.post<CommonResponseModal<PagingResponse<CongDoanResponse>>>(`${environment.api_domain}/CongDoan/get-cong-doan`,req);
  }

  GetCongDoanByKhuVuc=(req:any)=>{
    return this.httpCLient.post<CommonResponseModal<CongDoanResponse>>(`${environment.api_domain}/CongDoan/get-all-by-khuvuc`,req);
  }

  GetCBCongDoanByKhuVuc=(req:any)=>{
    return this.httpCLient.get<CommonResponseModal<CongDoanResponse>>(`${environment.api_domain}/CongDoan/get-cong-doan-by-khu-vuc?khuvuc=${req}`);
  }

  DeleteCongDoan=(id: number)=>{
    return this.httpCLient.delete(`${environment.api_domain}/CongDoan/delete?ID=${id}`);
  }

  CreateCongDoan=(req:any)=>{
    return this.httpCLient.post(`${environment.api_domain}/CongDoan/create`,req);
  }

  UpdateCongDoan=(req:any)=>{
    return this.httpCLient.post(`${environment.api_domain}/CongDoan/update`,req); 
  }

  GetMDSMay=(req:any)=>{
    return this.httpCLient.post(`${environment.api_domain}/May/get-danh-sach`,req);
  }

  DeleteMay=(id: number)=>{
    return this.httpCLient.delete(`${environment.api_domain}/May/delete?id=${id}`);
  }

}
