import CartActionTypes from './cart.types';

// We don't need payload here since what we want is just to toggle hidden or not. No payload is also seen in the header component (same reason)
export const toggleCartHidden = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN
});