import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  linkItems = [
    {
  id: 0,
  name: "Search",
  icon: "search",          // ✅ bor
  path: "/"
},
{
  id: 1,
  name: "Dashboard",
  icon: "layout-dashboard", // ✅ grid o'rniga
  path: "/"
},
{
  id: 2,
  name: "Product",
  icon: "box",              // ✅ bor
  path: "/"
},
{
  id: 3,
  name: "Analytics",
  icon: "chart-no-axes-combined",      // ✅ chart o'rniga
  path: "/"
},
{
  id: 4,
  name: "Calendar",
  icon: "calendar",         // ✅ bor
  path: "/"
},
{
  id: 5,
  name: "Messenger",
  icon: "message-circle",   // ✅ bor
  path: "/"
},
{
  id: 6,
  name: "Crypto",
  icon: "bitcoin",          // ✅ copy o'rniga
  path: "/"
},
  ]
}
