import React from 'react';
import './sign-in.scss';
import SignInComponent from '../../components/sign-in-component/sign-in-component';
import SignUp from '../../components/sign-up/sign-up';

const SignIn = () => (
	<div className='sign-in-and-sign-up'>
		<SignInComponent />
		<SignUp />
	</div>
)

export default SignIn;