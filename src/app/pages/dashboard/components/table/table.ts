import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { Employee, RespEmpl, RespUsers, User } from '../../../../shared/models/responses';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Services } from '../../../../core/services/g.services';

@Component({
  selector: 'app-table',
  imports: [LucideAngularModule, DatePipe, TitleCasePipe],
  templateUrl: './table.html',
})
export class Table implements OnInit {
  @Output() action = new EventEmitter<{ id: string, type: 'delete' | 'ban' | 'free' | 'form' | null}>();
  @Output() id = new EventEmitter<string>()
  @Output() editUser = new EventEmitter<User | Employee>()

  cdr = inject(ChangeDetectorRef)
  router = inject(Router)
  dashService = inject(DashboardService);
  GService = inject(Services)

  user:User = JSON.parse(localStorage.getItem('user')!)
  isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true)
    this.dashService.getAllusers(this.GService.whoUser() ? 'users' : 'employees').subscribe({
      next: (data: RespUsers | RespEmpl)=>{
        this.GService.whoUser() ? (this.dashService.users = (data as RespUsers).users) : (this.dashService.employees = (data as RespEmpl).employees)
        this.isLoading.set(false)
        this.cdr.detectChanges() 
        
      },
      error: err=>{
        this.isLoading.set(false)
        console.log(err)
        if (err.status===401) {
          this.router.navigate(['/login'])
        }
      }
    })
  }

  
  onAction(id: string, type: 'delete' | 'ban' | 'free' | 'form') {
    this.action.emit({ id, type });
  }
  openForm(user: User | Employee, id: string,  type: 'delete' | 'ban' | 'free' | 'form'){
    console.log(user);
    
    this.editUser.emit(user)
    this.action.emit({id, type})
  }
  onDelete(id: string){
    this.id.emit(id)
  }
  
}
