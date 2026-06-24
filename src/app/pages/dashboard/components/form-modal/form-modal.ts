import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../shared/models/responses';

@Component({
  selector: 'app-form-modal',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './form-modal.html',
})
export class FormModal {
  @Input() user: User | null = null
  @Output() submit = new EventEmitter()
  @Output() cancel = new EventEmitter()
  dashService = inject(DashboardService)
  userData: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  })
  isSuccess = signal(false)
  error = signal('')
  users = this.dashService.users
  onSubmit(){
    this.submit.emit(this.userData.value)
  }

  onCancel(){
    this.cancel.emit()
  }

  clearInput(){
    this.userData.reset({
      username: '',
      password: this.userData.get('password')?.value,
      role: this.userData.get('role')?.value
    })
  }


}
