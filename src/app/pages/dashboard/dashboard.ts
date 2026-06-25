import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { Sidebar } from "./components/sidebar/sidebar";
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { Filter } from "./components/filter/filter";
import { Statistics } from "./components/statistics/statistics";
import { Table } from './components/table/table';
import { FormModal } from "./components/form-modal/form-modal";
import { DeleteModal } from "./components/delete-modal/delete-modal";
import { BanModal } from './components/ban-modal/ban-modal';
import { FreeModal } from "./components/free-modal/free-modal";
import { Employee, RespEmpl, RespUsers, User } from '../../shared/models/responses';
import { Services } from '../../core/services/g.services';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidebar, Filter, Statistics, Table, FormModal, DeleteModal, BanModal, FreeModal],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  dashService = inject(DashboardService);
  gService = inject(Services)
  router = inject(Router)
  cdr = inject(ChangeDetectorRef)
  
  removeItemId:string = ''
  modalType = signal<'delete' | 'ban' | 'free' | 'form' | null>(null)
  selectUser: any  = null
  error = signal('')


  saveId(id: string) {  
    this.removeItemId = id
  }

  openModal(id: string, type: 'delete' | 'ban' | 'free' | 'form' | null){
    this.removeItemId = id;
    this.modalType.set(type)
  }
  openFormModal(user?: User | Employee){
    this.selectUser = user
    this.modalType.set('form')
  }
  closemOdal(){
    this.removeItemId = ''
    this.modalType.set(null)
  }


  onFormSubmit(event: {data: User | Employee, endp: string}){
    
    
    if(this.selectUser){
      this.dashService.updateUser(event.data, this.selectUser.id).subscribe({
        next: data=> {
          this.dashService.users = this.dashService.users.map(user =>
                user.id === this.selectUser.id ? { ...user, ...data.result } : user
            ); 
            this.modalType.set(null)
        },
        error: err=>console.log(err)        
      })
    }else{
      console.log(event.data);
      
      this.dashService.createUser(event.data, event.endp).subscribe({
        next: (data) => {        
          if (this.gService.whoUser()) {
            this.dashService.users = [...this.dashService.users, data as User];
          } else {
            this.dashService.employees = [...this.dashService.employees, data as Employee];
          }
          this.closemOdal()
        },
        error:err=>{
          console.log(err);
          this.error.set(err.error.message)
          setTimeout(() => {
            this.error.set('')
          }, 4000);
        }
        
      })
    }
  }

  onConfirmDeleteUser(){    
    this.dashService.deleteUser(this.removeItemId, this.gService.whoUser() ? 'user' : 'employee').subscribe({
      next: data=>{
        if (this.gService.whoUser()) {
          this.dashService.users = this.dashService.users.filter(user => user.id !== this.removeItemId)
        }else{
          this.dashService.employees = this.dashService.employees.filter(empl => empl.id !== this.removeItemId)
        }
        this.closemOdal()
        this.cdr.detectChanges()
      },
      error: err=>console.log(err)
    })
  }
  onConfirmBanModal(){
    this.dashService.banUser(this.removeItemId).subscribe({
      next: (data)=>{
        console.log(data);
        this.dashService.users = this.dashService.users.map(user=>
          user.id === this.removeItemId ? {...user, banned: true} : user
        )
        this.closemOdal()
        this.cdr.detectChanges()
      }, error: err=>console.log(err)
      
    })
  }
  onConfirmFreeModal(){
    this.dashService.freeUser(this.removeItemId).subscribe({
      next: (data)=>{
        console.log(data);
        this.dashService.users = this.dashService.users.map(user=>
          user.id === this.removeItemId ? {...user, banned: false} : user
        )
        this.closemOdal()
        this.cdr.detectChanges()
      }, error: err=>console.log(err)
      
    })
  }
  


  
}
