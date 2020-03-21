import React from 'react';
import './cart-icon.scss';

import { createStructuredSelector } from 'reselect';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

// We have destructured toggleCartHidden and thereby have bind it to onClick event
const CartIcon = ({ toggleCartHidden, itemCount }) => (
	<div className='cart-icon' onClick={toggleCartHidden}>
		<ShoppingIcon className='shopping-icon' />
		<span className='item-count'>{itemCount}</span>
	</div>
);

// Again here the aim of storing it to redux is because we might use the hidden fuction of the Cart pop up in some other way apart from just through clicking the header, hence the reason of storing the said state in redux (as a global state which can be accessed from anywhere or from any other need be).
// Always remember to add our Cart reducer to the Root Reducer!
const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

// were passing our whole reducer state into the selector!
const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount
});

export default connect(
	mapStateToProps, 
	mapDispatchToProps
	)(CartIcon);
