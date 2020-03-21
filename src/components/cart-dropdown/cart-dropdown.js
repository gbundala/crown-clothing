import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import './cart-dropdown.scss';
import CustomButton from '../custom-button/custom-button';

import CartItem from '../cart-item/cart-item'; 
import { selectCartItems } from '../../redux/cart/cart.selectors';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({ cartItems, history, dispatch }) => (
	<div className='cart-dropdown'>
		<div className='cart-items'>

			{cartItems.length ? (
				cartItems.map(cartItem => (
					<CartItem key={cartItem.id} item={cartItem} /> 
				))
			)	: (
					<span className='empty-message'>Your cart is empty!</span>
			)}

		</div>

		<CustomButton 
			onClick={() => {
				history.push('/checkout');
				dispatch(toggleCartHidden())
			}}
		>
			GO TO CHECKOUT
		</CustomButton>

	</div>
);

// instead of destructuring, we want the whole state so that we could pass it in the function
// this will make sure that our cart drop down component is not getting re-rendered whenever a state changes that is not related to the cart-items (that is why we have added the redux file cart.selectors)
const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems
})
export default withRouter(connect(mapStateToProps)(CartDropdown));