import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee, RespEmpl, RespUpdateUser, RespUsers, User } from '../../shared/models/responses';
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
  employees: Employee[] = []
  isHideStat: boolean = true; //statistika kartalari uchun </D>
  // editUser: User = [];

  getAllusers(endp: string):Observable<RespUsers | RespEmpl>{
    return this.http.get<RespUsers | RespEmpl>(`http://localhost:3000/api/${endp}`)
  }

  createUser(user:User | Employee, endp: string):Observable<User | Employee >{
    return this.http.post<User | Employee>(`http://localhost:3000/api/${endp}/create`, user)
  }

  updateUser(user: User | Employee, id: string):Observable<RespUpdateUser>{
    return this.http.put<RespUpdateUser>(`http://localhost:3000/api/user/update/${id}`, user)
  }

  deleteUser(id: string, endp: string){
    return this.http.delete(`http://localhost:3000/api/${endp}/delete/${id}`)
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
