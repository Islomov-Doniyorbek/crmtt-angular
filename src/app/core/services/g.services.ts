import { Injectable } from '@angular/core';
import { User } from '../../shared/models/responses';

@Injectable({
  providedIn: 'root',
})
export class Services {

  get user(): User {
    return JSON.parse(localStorage.getItem('user')!)
  }

  whoUser():boolean{
    return this.user?.role === 'admin'
  } 
}
