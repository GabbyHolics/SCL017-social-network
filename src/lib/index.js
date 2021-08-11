import { firebaseGetValidUser, firebaseInit } from './firebase.js';
import { setTemplate, setPageHash } from './routes.js';
import { realtimeListener } from '../dataFunctions/firebaseListener.js';

export const initApp = () => {
  firebaseInit(() => { // onFirebaseInit
    firebaseGetValidUser();
    setTemplate(window.location.hash);
    realtimeListener();
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null && user.emailVerified === true) {
      setPageHash('#home');
    } else if (!window.location.hash.includes('#register')) { // para no recargue pantalla login, cuando esta en la parte de verificar email
      setPageHash('#login');
    }
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(window.location.hash);
});
