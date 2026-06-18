import { Component, inject, OnInit } from '@angular/core';
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
  dashService = inject(DashboardService);
  user:User = JSON.parse(localStorage.getItem('user')!)
  users:User[] = []
  ngOnInit(): void {
    this.dashService.getAllusers().subscribe({
      next: (data)=>{
        console.log(data);
        
        this.users=data.users;
        console.log(this.users);        
      },
      error: err=>console.log(err)
      
    })
    
  }
  
}
