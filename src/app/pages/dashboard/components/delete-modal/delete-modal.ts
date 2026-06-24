import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-delete-modal',
  imports: [LucideAngularModule],
  templateUrl: './delete-modal.html',
})
export class DeleteModal {
  @Input() close = false
  @Output() confirm = new EventEmitter<boolean>()
  @Output() cancel = new EventEmitter<boolean>()
  dashService = inject(DashboardService)
  
  onConfirm(){
    this.confirm.emit()
  }
  onCancel(){
    this.cancel.emit()
  }
}
