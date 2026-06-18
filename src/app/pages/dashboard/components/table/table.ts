import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { User } from '../../../../responses';
import { PipesPipe } from '../../../../pipes-pipe';

@Component({
  selector: 'app-table',
  imports: [LucideAngularModule, PipesPipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  cdr = inject(ChangeDetectorRef)
  dashService = inject(DashboardService);
  user:User = JSON.parse(localStorage.getItem('user')!)
  users:User[] = []
  isLoading:boolean = true;
  ngOnInit(): void {
    this.dashService.getAllusers().subscribe({
      next: (data)=>{
        console.log(data);
        
        this.users=data.users;
        this.isLoading = false
        this.cdr.detectChanges()     
      },
      error: err=>{
        console.log(err)
        this.isLoading = false
      }
      
    })
    
  }
  
}
