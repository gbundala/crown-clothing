import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header';
import SignIn from './pages/sign-in/sign-in';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends Component {
	// We don't need this constructor anymore. We already passed the mapDispatchToProps method to App.js below

	unsubscribeFromAuth = null

	componentDidMount() {
		// We distructure setCurrentUser as we will use it twice below
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					//We have replaced the setState code with setCurrentUser Action code (user reducer action code). Interesting huh! Getting reducer to actually change the state here through props rather than setState.
					//Instead of using this.props.setCurrentUser, we have just said setCurrentUser because we have already distructured it above
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				});
			} 
			// (consider whether we need the else) we have wrapped it in an else statement so that this.setState does not fire twice - Is this comment even relevant ??
			//Instead of using this.props.setCurrentUser, we have just said setCurrentUser because we have already distructured it above
			//We don't need to pass an object with currentuser, we just need what the object we want to update with (I guess the value , right -- which is userAuth in this case as below)
			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		// App no longer has to pass state through the header tag in here. Our header is no longer dependent on App passing it in but App still updates our user reducer value and our header is still able to get our currentUser property
		return (
		    <div>
			    <Header />
			    <Switch>
			        <Route exact path='/' component={HomePage} />
			        <Route path='/shop' component={ShopPage} />
			        <Route path='/signin' component={SignIn} />
			    </Switch>
		    </div>
		);
	}
}

//is a redux function that gets dispatch property 
const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

//weve set our first argument to null as we dont need any state or props from our reducer
export default connect(null, mapDispatchToProps) (App);
 