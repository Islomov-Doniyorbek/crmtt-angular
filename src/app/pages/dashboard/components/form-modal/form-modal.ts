import { Component, inject } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './form-modal.html',
  styleUrl: './form-modal.css',
})
export class FormModal {
  dashService = inject(DashboardService)

  userData: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  })


  onSubmit(){
    this.dashService.createUser(this.userData.value).subscribe({
      next: data=>{
        console.log(data);
      },
      error:err=>{
        console.log(err);
      }
    })
  }


  clearInput(){
    this.userData.reset({
      username: '',
      password: this.userData.get('password')?.value,
      role: this.userData.get('role')?.value
    })
  }
}
