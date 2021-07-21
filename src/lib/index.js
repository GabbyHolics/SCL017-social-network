import { firebaseGetValidUser, firebaseInit } from './firebase.js';
import setTemplate from './routes.js';

export const initApp = () => {
  let uid = null;
  firebaseInit(() => {
    const user = firebaseGetValidUser();
    if (user != null) {
      uid = user.uid;
      setTemplate('#feed');
    } else {
      setTemplate('');
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null && user.emailVerified === true) {
      uid = user.uid;
      setTemplate('#feed');
    }
  });
};

window.addEventListener('hashchange', () => {
  setTemplate(window.location.hash);
});
