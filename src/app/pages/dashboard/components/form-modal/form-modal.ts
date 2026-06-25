import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../shared/models/responses';

@Component({
  selector: 'app-form-modal',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './form-modal.html',
})
export class FormModal implements OnInit {
  @Input() user: User | null = null
  @Input() error: any = null
  @Output() submitted = new EventEmitter()
  @Output() cancel = new EventEmitter()

  _user:User = JSON.parse(localStorage.getItem('user')!)
  dashService = inject(DashboardService)

  userData: FormGroup = this._user.role === 'admin' ? 
  new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', !this.user ? null : Validators.required),
    role: new FormControl('user', Validators.required),
  }) : 
  new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    status: new FormControl('active', Validators.required),
    role: new FormControl('amaliyotchi', Validators.required),
  })

  endp: string = this._user.role === 'admin' ? 'user' : 'employee';

  isSuccess = signal(false)

  ngOnInit(): void {
    if (this.user) {
      this.userData.patchValue({
        username: this.user.username,
        role: this.user.role,
      })
    }
  }

  onSubmit(){
    console.log(this.userData.value);
    
    this.submitted.emit({data: {...this.userData.value, user_id: this._user.id}, endp: this.endp})
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
