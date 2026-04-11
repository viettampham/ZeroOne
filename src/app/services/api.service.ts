import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { LoginResponse } from '../model/ResponseModel/LoginResponse';
import { LoginRequest } from '../model/RequestModel/LoginRequest';
import { CommonResponseModal } from '../model/ResponseModel/CommonResponseModal';
import { NhanVienResponse } from '../model/ResponseModel/NhanVienResponse';
import { GetNhanVienRequest } from '../model/RequestModel/GetNhanVienRequest';
import { PagingResponse } from '../model/ResponseModel/PagingResponse';



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
  
}
