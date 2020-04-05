import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyAi_PLoZhf_gDI8oZMjlnucbeHcaKb-E9g",
    authDomain: "crown-db-92bbb.firebaseapp.com",
    databaseURL: "https://crown-db-92bbb.firebaseio.com",
    projectId: "crown-db-92bbb",
    storageBucket: "crown-db-92bbb.appspot.com",
    messagingSenderId: "811155451348",
    appId: "1:811155451348:web:8262314504d4d1658cba41",
    measurementId: "G-JQ8YLBFH2Y"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

    //it returns just a random user ID since we know our collection is emptly anyway ;), in the beginning of course -- during testing
    const userRef = firestore.doc(`users/${userAuth.uid}`);
	
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // this code here basically creates the snapshot, it creates the data
        try {
            // .set() being the create method 
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    // we might still want the user reference in our code for something (for some use), that why were returning the userref
    return userRef;
}

 firebase.initializeApp(config);

 export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj); 
    });

    // to fire off our batch request
    return await batch.commit();
 };

 export const convertCollectionsSnapshotToMap = (collections) => {
     const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
     });

     return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
     }, {});
 }

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });
 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase;
