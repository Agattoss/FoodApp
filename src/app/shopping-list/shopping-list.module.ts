
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";
import * as fromShoppingList from './store/shopping-list.reducer';

@NgModule({
    declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ShoppingListRoutingModule,
        StoreModule.forFeature('shoppingList', fromShoppingList.shoppingListReducer),
        SharedModule
    ]

})

export class ShoppingListModule{}
