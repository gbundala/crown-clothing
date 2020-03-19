import React from 'react';
import './custom-button.scss';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
	// we have conditionally rendered using string interpolation the className of google signin other wise... (the ternary now!)
	<button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
		{children}
	</button>
);

export default CustomButton;