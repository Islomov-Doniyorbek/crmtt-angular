import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { User } from '../../../../shared/models/responses';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar {

  @Output() openModal = new EventEmitter<void>()
  dashService = inject(DashboardService)
  user: User = JSON.parse(localStorage.getItem('user')!)

  openFormModal(){
    this.openModal.emit()
  }
  
}
