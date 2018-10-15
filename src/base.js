import Rebase from 're-base';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBDVrmPGWfPFM-g6MPEqXafGfVAcRqNyVY",
    authDomain: "campanha-bora-ajudar.firebaseapp.com",
    databaseURL: "https://campanha-bora-ajudar.firebaseio.com",
    projectId: "campanha-bora-ajudar",
    storageBucket: "campanha-bora-ajudar.appspot.com",
    messagingSenderId: "555835654772"
}

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export const auth = firebase.auth();
export default base;