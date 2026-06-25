import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RespUpdateUser, RespUsers, User } from '../../shared/models/responses';
import { Observable } from 'rxjs';
interface Uuser {
  username: string
  password: string
  role: string
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient)
  users:User[] = []
  isHideStat: boolean = true; //statistika kartalari uchun </D>
  // editUser: User = [];

  getAllusers():Observable<RespUsers>{
    const token = localStorage.getItem('accToken')
    return this.http.get<RespUsers>('http://localhost:3000/api/users')
  }

  createUser(user:User){
    return this.http.post<User>('http://localhost:3000/api/user/create', user)
  }

  updateUser(user: User, id: string):Observable<RespUpdateUser>{
    return this.http.put<RespUpdateUser>(`http://localhost:3000/api/user/update/${id}`, user)
  }

  deleteUser(id: string){
    return this.http.delete(`http://localhost:3000/api/user/delete/${id}`)
  }

  banUser(id: string){
    return this.http.patch(`http://localhost:3000/api/user/ban/${id}`, {})
  }
  freeUser(id: string){
    return this.http.patch(`http://localhost:3000/api/user/free/${id}`, {})
  }










  hideStat(){
    this.isHideStat = !this.isHideStat
  }
}
