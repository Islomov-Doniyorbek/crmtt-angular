import { Component, inject, signal } from '@angular/core';
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
  error = signal('')
  onLogin(){
    this.loginService.login(this.formData.value).subscribe({
      next: (res)=>{
        console.log(res);
        localStorage.setItem('accToken', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate(['/'])
      },
      error: (err)=>{
        console.log(err);
        if (err.status === 404) {
          this.error.set("Bunday foydalanuvchi mavjud emas!")
        }
        if (err.status === 500) {
          this.error.set("Serverda xatolik!!!")
        }
        if (err.status === 0) {
          this.error.set("Serverda o'chirilgan!!!")
        }
        setTimeout(() => {
          this.error.set('')
        }, 3000);
        
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
