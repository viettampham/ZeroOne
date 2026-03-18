import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { LoginResponse } from '../model/ResponseModel/LoginResponse';
import { LoginRequest } from '../model/RequestModel/LoginRequest';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpCLient: HttpClient) {}

  Login=(request : LoginRequest)=>{
    return this.httpCLient.post<LoginResponse>(`${environment.api_domain}/NhanVien/authentication`,request);
  }
}
