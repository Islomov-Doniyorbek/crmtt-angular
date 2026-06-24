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
import { User } from '../../shared/models/responses';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidebar, Filter, Statistics, Table, FormModal, DeleteModal, BanModal, FreeModal],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  dashService = inject(DashboardService);
  router = inject(Router)
  cdr = inject(ChangeDetectorRef)
  
  userId:string = ''
  modalType = signal<'delete' | 'ban' | 'free' | 'form' | null>(null)
  selectUser: any  = null
  error = signal('')


  saveId(id: string) {  
    this.userId = id
  }

  openModal(id: string, type: 'delete' | 'ban' | 'free' | 'form' | null){
    this.userId = id;
    this.modalType.set(type)
  }
  openFormModal(user?: User){
    this.selectUser = user
    this.modalType.set('form')
  }
  closemOdal(){
    this.userId = ''
    this.modalType.set(null)
  }


  onFormSubmit(data: User){
    console.log(this.selectUser.id);
    
    if(this.selectUser){
      this.dashService.updateUser(data, this.selectUser.id).subscribe({
        next: data=> {
          this.dashService.users = this.dashService.users.map(user =>
                user.id === this.selectUser.id ? { ...user, ...data.result } : user
            ); 
            
            this.modalType.set(null)
        },
        error: err=>console.log(err)
        
        
      })
    }else{
      this.dashService.createUser(data).subscribe({
        next: data => {        
          this.dashService.users = [
            ...this.dashService.users,
            data
          ];
          this.closemOdal()
        },
        error:err=>{
          console.log(err);
          this.error.set(err.error.message)
          // if(err.status === 409){
          //   this.error.set(err.error.message)
          // }
          setTimeout(() => {
            this.error.set('')
          }, 4000);
        }
        
      })
    }
  }

  onConfirmDeleteUser(){    
    this.dashService.deleteUser(this.userId).subscribe({
      next: data=>{
        this.dashService.users = this.dashService.users.filter(user => user.id !== this.userId)
        this.closemOdal()
        this.cdr.detectChanges()
      },
      error: err=>console.log(err)
    })
  }
  onConfirmBanModal(){
    this.dashService.banUser(this.userId).subscribe({
      next: (data)=>{
        console.log(data);
        this.dashService.users = this.dashService.users.map(user=>
          user.id === this.userId ? {...user, banned: true} : user
        )
        this.closemOdal()
        this.cdr.detectChanges()
      }, error: err=>console.log(err)
      
    })
  }
  onConfirmFreeModal(){
    this.dashService.freeUser(this.userId).subscribe({
      next: (data)=>{
        console.log(data);
        this.dashService.users = this.dashService.users.map(user=>
          user.id === this.userId ? {...user, banned: false} : user
        )
        this.closemOdal()
        this.cdr.detectChanges()
      }, error: err=>console.log(err)
      
    })
  }
  


  
}
