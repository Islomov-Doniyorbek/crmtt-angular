import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient)
  private token = localStorage.getItem("token")
  url = 'http://localhost:3000';

  header(token:string): HttpHeaders{
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      })
  }

  get<T>(endpoint: string){
    return this.http.get<T>(`${this.url}/${endpoint}`)
  }

  post<T>(endpoint:string, body: any){
    const tokken = localStorage.getItem('token')
    return this.http.post<T>(`${this.url}/${endpoint}`,body, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokken}`,
        'Content-type': 'application-json'
      })
    })
  }
}
