import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { User } from '../../../../responses';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user')!)
  ngOnInit(): void {
    console.log(this.user);
    
  }
  
}
