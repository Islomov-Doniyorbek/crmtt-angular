import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';
import { User } from '../../../../shared/models/responses';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  @Input() isEdit: boolean = false

  @Output() editMode = new EventEmitter<void>()
  @Output() editCancel = new EventEmitter<void>()
  @Output() openModal = new EventEmitter<void>()
  dashService = inject(DashboardService)
  user: User = JSON.parse(localStorage.getItem('user')!)
  

  openFormModal(){
    this.openModal.emit()
  }
  onEdit(){
    this.editMode.emit()
  }
  onEditCancel(){
    this.editCancel.emit()
  }
  
}
