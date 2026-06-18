import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Api } from '../../services/api';
import { RespUsers } from '../../responses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient)
  
  private apiService = inject(Api)
  isHideStat: boolean = true; //statistika kartalari uchun
  isForm: boolean = false; //forma modal uchun
  getAllusers():Observable<RespUsers>{
    const token = localStorage.getItem('accToken')
    return this.http.get<RespUsers>('http://localhost:3000/api/users', {
      headers: this.apiService.header(token!)
    })
  }


  hideStat(){
    this.isHideStat = !this.isHideStat
  }
  openForm(){
    this.isForm = !this.isForm;
  }
}
