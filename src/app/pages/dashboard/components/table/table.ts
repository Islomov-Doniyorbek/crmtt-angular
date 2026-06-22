import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { User } from '../../../../responses';
import { PipesPipe } from '../../../../pipes-pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  @Output() action = new EventEmitter<{ id: string, type: 'delete' | 'ban' | 'free' }>();
  @Output() id = new EventEmitter<string>()
  cdr = inject(ChangeDetectorRef)
  dashService = inject(DashboardService);
  user:User = JSON.parse(localStorage.getItem('user')!)
  isLoading:boolean = true;


  ngOnInit(): void {
    this.dashService.getAllusers().subscribe({
      next: (data)=>{
        this.dashService.users = data.users
        this.isLoading = false
        this.cdr.detectChanges()
      },
      error: err=>{
        console.log(err)
        this.isLoading = false
      }
    })
  }

  onAction(id: string, type: 'delete' | 'ban' | 'free') {
    this.action.emit({ id, type });
  }

  onDelete(id: string){
    this.id.emit(id)
  }
  
}
