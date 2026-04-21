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
  
}
