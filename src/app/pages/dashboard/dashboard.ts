import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { Sidebar } from "./components/sidebar/sidebar";
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { Filter } from "./components/filter/filter";
import { Statistics } from "./components/statistics/statistics";
import { Table } from './components/table/table';
import { FormModal } from "./components/form-modal/form-modal";

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidebar, Filter, Statistics, Table, FormModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  dashService = inject(DashboardService);
  router = inject(Router)
  users = []
  constructor() {
  console.log('Dashboard yaratildi');
}
  ngOnInit(): void {
    console.log("Dashboard Build");
    
    this.dashService.getAllusers().subscribe({
      next: (res)=>{
        
        console.log(res);
      },
      error: (err)=> {
        console.log(err);
        if (err.status===401) {
          this.router.navigate(['/login'])
        }
      }
      
    })
    console.log(this.users);
    
  }
  ngOnDestroy() {
  console.log('Dashboard DESTROY');
}
}
