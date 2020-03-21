import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
	hidden: true,
	cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {

		// Each of the cases below listens to the respective assigned action then responds. Thats the beauty of redux, all states are designated in one location for state management
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden
			};

		case CartActionTypes.ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload)
			};

		case CartActionTypes.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload)
			};		

		case CartActionTypes.CLEAR_ITEM_FROM_CART:
			return {
				...state,
				// Filter returns back to us anything that yields true inside of the actual function
				// In this case below, the filter method will keep the item that we are not trying to checkout and it gives us back a new array
				cartItems: state.cartItems.filter(
					cartItem => cartItem.id !== action.payload.id
				)			
			};	

		default:
			return state;
	}
}

export default cartReducer;