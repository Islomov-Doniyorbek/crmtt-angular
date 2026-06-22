import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-ban-modal',
  imports: [LucideAngularModule],
  templateUrl: './ban-modal.html',
  styleUrl: './ban-modal.css',
})
export class BanModal {
  @Input() close = false
  @Output() confirm = new EventEmitter<boolean>()
  @Output() cancel = new EventEmitter<boolean>()


  banConfirm(){
    this.confirm.emit()
  }
  onCancel(){
    this.cancel.emit()
  }
}
