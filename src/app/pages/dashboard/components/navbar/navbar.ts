import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { User } from '../../../../shared/models/responses';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  dashService = inject(DashboardService)
  user: User = JSON.parse(localStorage.getItem('user')!)
  ngOnInit(): void {
    console.log(this.user);
    
  }
  
}
