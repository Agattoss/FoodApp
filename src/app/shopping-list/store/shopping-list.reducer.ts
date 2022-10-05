
import { Ingredient } from "../../shared/ingredient.model";
import *  as ShoppingListAction from "./shopping-list.action";

const initialState = {
    ingredients:[
        new Ingredient("Apples", 3),
        new Ingredient("Tomatoes", 4),
      ]
};

export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListAction.ShoppingListActions
    ){
    switch (action.type){
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients, action.payload ]
            };
        case ShoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients:[...state.ingredients, ...action.payload ]
            };
            default:
                return state;
    }
}