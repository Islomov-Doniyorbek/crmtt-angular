import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespLogin } from "../../responses";


@Injectable ({
    providedIn: 'root'
})

export class LoginService {
    http = inject(HttpClient)
    
    login(formdata: any):Observable<RespLogin>{
        return this.http.post<RespLogin>(`http://localhost:3000/api/login`, formdata)
    }
}