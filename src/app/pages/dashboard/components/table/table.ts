import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { User } from '../../../../responses';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  @Output() action = new EventEmitter<{ id: string, type: 'delete' | 'ban' | 'free' | null}>();
  @Output() id = new EventEmitter<string>()
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

  onAction(id: string, type: 'delete' | 'ban' | 'free') {
    this.action.emit({ id, type });
  }
  openForm(id: string, type: null){
    this.dashService.open();
    this.action.emit({id, type})
  }

  onDelete(id: string){
    this.id.emit(id)
  }
  
}
