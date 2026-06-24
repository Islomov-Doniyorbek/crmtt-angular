import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  linkItems = [
    {
      id: 0,
      name: "Search",
      icon: "search",          
      path: "/"
    },
    {
      id: 1,
      name: "Dashboard",
      icon: "layout-dashboard", 
      path: "/"
    },
    {
      id: 2,
      name: "Product",
      icon: "box",             
      path: "/"
    },
    {
      id: 3,
      name: "Analytics",
      icon: "chart-no-axes-combined",      
      path: "/"
    },
    {
      id: 4,
      name: "Calendar",
      icon: "calendar",         
      path: "/"
    },
    {
      id: 5,
      name: "Messenger",
      icon: "message-circle", 
      path: "/"
    },
    {
      id: 6,
      name: "Crypto",
      icon: "bitcoin",          
      path: "/"
    },
  ]
}
