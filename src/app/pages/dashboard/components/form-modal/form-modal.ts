import { Component, inject } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './form-modal.html',
  styleUrl: './form-modal.css',
})
export class FormModal {
  dashService = inject(DashboardService)

  userData: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(),
  })


  clearInput(){
    this.userData.reset({
      username: '',
      password: this.userData.get('password')?.value,
      role: this.userData.get('role')?.value
    })
  }
}
