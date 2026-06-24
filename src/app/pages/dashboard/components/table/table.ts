import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { User } from '../../../../shared/models/responses';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './table.html',
})
export class Table implements OnInit {
  @Output() action = new EventEmitter<{ id: string, type: 'delete' | 'ban' | 'free' | 'form' | null}>();
  @Output() id = new EventEmitter<string>()
  @Output() editUser = new EventEmitter<User>()
  cdr = inject(ChangeDetectorRef)
  router = inject(Router)
  dashService = inject(DashboardService);
  user:User = JSON.parse(localStorage.getItem('user')!)
  isLoading = signal(false);


  ngOnInit(): void {
    this.isLoading.set(true)
    this.dashService.getAllusers().subscribe({
      next: (data)=>{
        this.dashService.users = data.users
        this.isLoading.set(false)
        this.cdr.detectChanges()
      },
      error: err=>{
        this.isLoading.set(false)
        console.log(this.isLoading);
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
  openForm(user: User, id: string,  type: 'delete' | 'ban' | 'free' | 'form'){
    this.editUser.emit(user)
    this.action.emit({id, type})
  }

  onDelete(id: string){
    this.id.emit(id)
  }
  
}
