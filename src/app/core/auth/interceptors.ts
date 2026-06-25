import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const interceptorsInterceptor: HttpInterceptorFn = (req, next) => {
  
  const publicReq = ['/api/login']

  const isPublic = publicReq.some(url=>req.url.includes(url))

  const router = inject(Router)
  const token = localStorage.getItem('accToken')

  const authReq = (token && !isPublic) ? req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  }) : req;
  
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse)=>{
      console.log(error);
      if (error.status === 0 || error.status === 401) {
        localStorage.removeItem('accToken')
        router.navigate(['/login'])
      }
      return throwError(()=>error)
    })
  );
};
