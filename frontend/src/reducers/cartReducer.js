import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

function cartReducer( state={cartItems:[]}, action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.productId === item.productId);
            if(product){
                return {
                  cartItems: state.cartItems.map(x => x.productId === product.productId ? item: x)
                };
            }
            return { cartItems: [...state.cartItems, item] };

        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.productId !== action.payload)}

        default:
           return state;
    }
}

export {cartReducer};