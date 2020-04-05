import React from 'react';
// import './header.scss';
// import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { HeaderContainer, LogoContainer, OptionContainer, OptionLink, OptionDiv } from './header.styles';

const Header = ({ currentUser, hidden }) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<Logo className='logo' />
		</LogoContainer>
		<OptionContainer>
			<OptionLink to='/shop'>
				SHOP
			</OptionLink>
			<OptionLink to='/contact'>
				CONTACT
			</OptionLink>
			{
				currentUser ? 
				// the signOut() call function is provided by the firebase auth library! Awesome huh!
				<OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
				:
				<OptionLink to='/signin'>SIGN IN</OptionLink>
			}
			<CartIcon />
		</OptionContainer>
		{
			hidden ? null : <CartDropdown />
		}
	</HeaderContainer>
)

// We have destructed nested value of our state by replacing state with user: { current...}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser, 
	hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);