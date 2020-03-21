import React from 'react';
import './checkout-item.scss';

// We need to bind our actual new action to our component (very similar to how we did with add-item). Hence importing {connect}.
import { connect } from 'react-redux';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {

	// In this way we hav access to both our cartItem and clearItem function, by making an explicit function declaration
	const { name, imageUrl, price, quantity } = cartItem;
	
	return (
	<div className='checkout-item'>

		<div className='image-container'>
			<img src={imageUrl} alt='item' />
		</div>

		<span className='name'>{name}</span>
		<span className='quantity'>
			<div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
			<span className='value'>{quantity}</span>
			<div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
		</span>
		<span className='price'>{price}</span>
		<div className='remove-button' onClick={() => clearItem(cartItem)}>
			&#10005;
		</div>

	</div>
	);
};

const mapDispatchToProps = dispatch => ({
	clearItem: item => dispatch(clearItemFromCart(item)),
	addItem: item => dispatch(addItem(item)),
	removeItem: item => dispatch(removeItem(item))
}) 

export default connect(
	null, 
	mapDispatchToProps
	)(CheckoutItem);