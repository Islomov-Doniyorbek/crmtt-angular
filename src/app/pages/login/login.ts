import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Home, User } from 'lucide-angular';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginService = inject(LoginService)
  router = inject(Router)

  formData:FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  isHide: boolean = false

  onLogin(){
    console.log(this.formData.value);
    this.loginService.login(this.formData.value).subscribe({
      next: (res)=>{
        console.log(res);
        localStorage.setItem('accToken', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate(['/'])
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
  clearInput(){
    this.formData.reset({
      username: '',
      password: this.formData.get('password')?.value
    })
  }
  hide(){
    this.isHide = !this.isHide
  }
}
