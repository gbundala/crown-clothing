export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToAdd.id
	);

	// the function means: if the existing cartItem actual exists then it will return
	// the good thing about map() is that it returns a new array . We need to return new versions of state so that our component will re-render properly
	if (existingCartItem) {
		return cartItems.map(cartItem => 
			cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
			)
	}

	// quantity property gets attached the first time around since this if block wont run when its a new item!
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};