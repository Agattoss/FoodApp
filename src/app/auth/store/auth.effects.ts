import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect } from "@ngrx/effects";
import { ofType } from "@ngrx/effects";
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.authenticateSuccess({ email, userId, token, expirationDate, redirect: true });
};

const handleError=(errorRes: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occured!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({errorMessage}));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Operation not allowed!';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'Try later!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(AuthActions.authenticateFail({errorMessage}));
}

@Injectable({providedIn: 'root'})
export class AuthEffects{

constructor(
  private actions$: Actions,
  private http: HttpClient,
  private router: Router,
  private authService: AuthService){};

  authSignup$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.signupStart),
    switchMap(action => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            environment.firebaseApiKey,
          {
            email: action.email,
            password: action.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  )
);

authLogin$ = createEffect (() =>
this.actions$.pipe(
  ofType(AuthActions.loginStart),
  switchMap(action => {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
        {
          email: action.email,
          password: action.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(
            +resData.expiresIn,
            resData.email,
            resData.localId,
            resData.idToken
          );
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
  })
)
);
/* authLogin = this.actions$.pipe(
  ofType(AuthActions.loginStart),
  switchMap((authData: AuthEffects.loginStart)=> {
    return.this.http
    .post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
      {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
      }
    )
  })
) */


}