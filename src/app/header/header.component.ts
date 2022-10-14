import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isLoggedIn = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isLoggedIn = !user ? false : true;
      });
  }
  onSaveData() {
    this.store.dispatch(RecipeActions.storeRecipes())
  }
  onFetchData() {
    this.store.dispatch(RecipeActions.fetchRecipe())
  }
  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
