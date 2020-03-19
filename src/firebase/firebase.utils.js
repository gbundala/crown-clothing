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

 firebase.initializeApp(config);

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });
 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase;
