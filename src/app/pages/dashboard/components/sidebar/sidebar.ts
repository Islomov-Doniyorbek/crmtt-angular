import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from "@angular/router";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, RouterLink, TitleCasePipe],
  templateUrl: './sidebar.html',
})
export class Sidebar {

  user = JSON.parse(localStorage.getItem('user')!)
  open = signal(true)

  openSide(){
    this.open.set(true)
  }
  closeSide(){
    this.open.set(false)
  }

  linkItems = this.user.role === 'admin' ? 
  [
    {
      id: 1,
      name: "Dashboard",
      icon: "layout-dashboard", 
      path: "/"
    },
    {
      id: 2,
      name: "Messenger",
      icon: "message-circle", 
      path: "/process"
    },
  ]
  : 
  [
    {
      id: 1,
      name: "Dashboard",
      icon: "layout-dashboard", 
      path: "/"
    },
    {
      id: 2,
      name: "Shtatlar",
      icon: "Briefcase",             
      path: "/process"
    },
    {
      id: 3,
      name: "FOT",
      icon: "calculator",      
      path: "/process"
    },
    {
      id: 4,
      name: "Calendar",
      icon: "calendar",         
      path: "/process"
    },
    {
      id: 5,
      name: "Messenger",
      icon: "message-circle", 
      path: "/process"
    },
    {
      id: 6,
      name: "Crypto",
      icon: "bitcoin",          
      path: "/process"
    },
  ]
}
