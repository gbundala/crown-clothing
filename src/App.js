import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header';
import SignIn from './pages/sign-in/sign-in';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: null
		}
	}

	unsubscribeFromAuth = null

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data()
						}
					});
				})

			} 
			// (consider whether we need the else) we have wrapped it in an else statement so that this.setState does not fire twice
			this.setState({ currentUser: userAuth });
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
		    <div>
			    <Header currentUser={this.state.currentUser} />
			    <Switch>
			        <Route exact path='/' component={HomePage} />
			        <Route path='/shop' component={ShopPage} />
			        <Route path='/signin' component={SignIn} />
			    </Switch>
		    </div>
		);
	}
}

export default App;
 