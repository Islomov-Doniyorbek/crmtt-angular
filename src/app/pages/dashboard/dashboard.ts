import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { User } from '../../responses';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidebar, Filter, Statistics, Table, FormModal, DeleteModal, BanModal, FreeModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  dashService = inject(DashboardService);
  router = inject(Router)
  cdr = inject(ChangeDetectorRef)
  
  userId:string = ''
  modalType: 'delete' | 'ban' | 'free' | 'form' | null = null
  selectUser: any  = null


  saveId(id: string) {
    console.log(id);    
    this.userId = id
  }


  openModal(id: string, type: 'delete' | 'ban' | 'free' | 'form' | null){
    this.userId = id;
    this.modalType = type
  }
  openFormModal(user?: User){
    this.selectUser = user
    this.modalType = 'form'
  }
  closemOdal(){
    this.userId = ''
    this.modalType = null
  }


  onFormSubmit(data: User){

    this.dashService.createUser(data).subscribe({
      next: data => {
        this.dashService.users = [
          ...this.dashService.users,
          data
        ];
      },
      error:err=>{
        console.log(err);
        console.log(err.status);
        // if(err.status === 409){
        //   this.error.set(err.error.message)
        // }
        // setTimeout(() => {
        //   this.error.set('')
        // }, 4000);
      }
      
    })
  }

  onConfirmDeleteUser(){    
    this.dashService.deleteUser(this.userId).subscribe({
      next: data=>{
        this.dashService.users = this.dashService.users.filter(user => user.id !== this.userId)
        this.userId = ''
        this.modalType = null
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
        this.modalType= null
        this.userId = ''
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
        this.modalType= null
        this.userId = ''
        this.cdr.detectChanges()
      }, error: err=>console.log(err)
      
    })
  }
  


  
}
