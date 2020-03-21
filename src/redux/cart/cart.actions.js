import CartActionTypes from './cart.types';

// We don't need payload here since what we want is just to toggle hidden or not. No payload is also seen in the header component (same reason)
export const toggleCartHidden = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item
});

export const removeItem = item => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: item
});

export const clearItemFromCart = item => ({
	type: CartActionTypes.CLEAR_ITEM_FROM_CART,
	payload: item
});