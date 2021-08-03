// función de inicializar firebase
let database = null;
export const firebaseGetDatabase = () => database;

export const firebaseInit = (onFirebaseInit) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC7VRqwv_KqG8k7lA6EpUuPIvQ70r-jafY',
    authDomain: 'bearhug-ca9c3.firebaseapp.com',
    projectId: 'bearhug-ca9c3',
    storageBucket: 'bearhug-ca9c3.appspot.com',
    messagingSenderId: '518796083283',
    appId: '1:518796083283:web:2a47b273fcd1b933e586a6',
    measurementId: 'G-XEMSLEFBF3'
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.firestore();
  onFirebaseInit();
};

// función de hacer login con firebase
export const firebaseLogin = (email, password, onLoginComplete) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      onLoginComplete();
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(`Error : ${errorMessage}`);
    });
};

// función de hacer login a través de Google con Firebase
export const firebaseGoogleLogin = (onLoginComplete) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {

      // comprobar si el usuario existe o no
      const userDataRef = firebaseGetDatabase().collection('userData');
      const user = userDataRef.where('userId', '==', result.user.uid);
      user.get().then((doc) => {
        // si usuario existe, se loguea al muro
        console.log(doc);
        if (!doc.empty) {
          console.log('google signed in');
        } else {
          // si usuario no existe, se agrega la data (id, etc)
          firebaseGetDatabase().collection('userData').add({
            userId: result.user.uid, 
            userName: result.user.displayName,
            userEmail: result.user.email,
            userPic: result.user.photoURL
          });
          console.log('registro exitoso con google');
        }
        onLoginComplete();
      });
    }).catch((error) => {
      console.log(error);
      // ...
    });
};

// función de salir del login con firebase
export const firebaseLogout = () => {
  firebase.auth().signOut()
    .then(() => {
    })
    .catch((error) => {
      console.error(error);
    });
};

// función de registrar al usuario con firebase
export const firebaseRegisterUser = (email, password, userName, onVerifyEmail) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      firebaseGetDatabase().collection('userData').add({ // se añade data del usuario a una nueva colección de usuarios
        userId: firebase.auth().currentUser.uid, // ID usuario
        userName: userName, // nombre usuario
        userEmail: email, // correo usuario
        userPic: './images/ejemploperfilfoto.png' // foto por defecto usuario
      });

      // para que el nombre registrado se pase a la propiedad de firebase llamada displayName
      userCredential.user.updateProfile({
        displayName: userName
      });

      const user = firebase.auth().currentUser;
      if (user != null) {
        user.sendEmailVerification()
          .then(() => {
            console.log('verification email sent');
            onVerifyEmailSent();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
// Signed in
};

export const firebaseGetValidUser = () => {
  const user = firebase.auth().currentUser;
  if (user != null && user.emailVerified) {
    return user;
  }
  return null;
};
