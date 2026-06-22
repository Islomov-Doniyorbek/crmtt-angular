import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-free-modal',
  imports: [],
  templateUrl: './free-modal.html',
  styleUrl: './free-modal.css',
})
export class FreeModal {
  @Input() close = false
  @Output() confirm = new EventEmitter<boolean>()
  @Output() cancel = new EventEmitter<boolean>()
  
  onConfirm(){
    this.confirm.emit()
  }
  onCancel(){
    this.cancel.emit()
  }
}
