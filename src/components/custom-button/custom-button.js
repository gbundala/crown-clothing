import React from 'react';
// import './custom-button.scss';
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, ...props }) => (
	// we have conditionally rendered using string interpolation the className of google signin other wise... (the ternary now!)
	<CustomButtonContainer {...props} >
		{children}
	</CustomButtonContainer>
);

export default CustomButton;