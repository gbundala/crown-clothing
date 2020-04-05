import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions'; 

import CollectionsOverview from '../../components/collections-overview/collections-overview';

import CollectionPage from '../collection/collection';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import WithSpinner from '../../components/with-spinner/with-spinner';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	state = {
		loading: true
	};

	unsubscribeFromSnapshot = null; 

	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');

		//this Promise approach is an alternative to the Observer approach as seen in the App.js file
		//we would rather keep it here and not in the highest component (App.js) for better performance
		collectionRef.get().then(snapshot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
			this.setState({ loading: false });
		});
	}

	render() {
		// we have destructured the match off of our props
		const { match } = this.props;
		//we then also destructure the loading value from our state
		const { loading } = this.state;
		return (
			<div className='shop-page'>
				<Route exact 
					path={`${match.path}`} 
					render={(props) => (
						<CollectionsOverviewWithSpinner isLoading={loading} {...props} />
					)} 
				/>
				<Route 
					path={`${match.path}/:collectionId`} 
					render={(props) => (
						<CollectionPageWithSpinner isLoading={loading} {...props} />
					)} 
				/>
			</div>
		);
	}
} 

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => 
	dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
