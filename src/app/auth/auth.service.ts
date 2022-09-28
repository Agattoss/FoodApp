import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
idToken: string;
email: string;
refreshToken: string;	
expiresIn: string;	
localId: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {

    }
    signup(email: string, password: string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBR9puoo68apnMx8wpIU6xFnlyxEY5SCa4', {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(errorRes => {
            let errorMessage = "An unknown error occured!"
            if(!errorRes.error || !errorRes.error.error) {
               return throwError( () => new Error(errorMessage));
            }
            switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage= 'This email already exists';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage= 'Operation not allowed!'; 
                    break;  
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage= 'Try later!';
                    break;
                    
                    
            }
            return throwError( () => new Error(errorMessage));
        }))
    };
}