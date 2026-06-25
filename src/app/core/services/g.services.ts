import { Injectable } from '@angular/core';
import { User } from '../../shared/models/responses';

@Injectable({
  providedIn: 'root',
})
export class Services {

  user:User = JSON.parse(localStorage.getItem('user')!)

  whoUser():boolean{
    return this.user?.role === 'admin'
  } 
}
