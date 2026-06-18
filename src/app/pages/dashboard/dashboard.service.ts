import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Api } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient)
  
  private apiService = inject(Api)
  getAllusers<T>(){
    const token = localStorage.getItem('accToken')
    return this.http.get<T>('http://localhost:3000/api/users', {
      headers: this.apiService.header(token!)
    })
  }
}
