import { firebaseLogin, firebaseGoogleLogin } from '../lib/firebase.js';


export const homeTemplate = () => {
  const containerLogin = document.createElement('div');
  containerLogin.className = "containerLoginClass"

  const login = `
    <div class="homeImage">
    <img src="images/logotipo.png" class="logotipo">
    <p>Crear conexiones amables y cercanas</p>
  </div>
    <div class="formRegister">
    <input type="email" id="emailField" class="emailBox" placeholder="Ingresa tu correo">
    <input type="password" id="passwordField" class="passwordBox" placeholder="Ingresa tu contraseña">
    <button class="buttonLog"><a href="#/muro" id="loginButton">Ingresar</a></button>
    <div class="secondOptionText">Ingresa con <a href="#registroGoogle" id="googleLogin">Google</a>
    <img src="images/gmail.svg" class="gmail.svg">
    </div>
    <div class="secondOptionText">¿No tienes cuenta? <a href="#register" id="userReg">Regístrate aquí</a></div>
    </div>
   `;
  
  containerLogin.innerHTML = login; // hace el nodo.
  const loginButton = containerLogin.querySelector('#loginButton');
  loginButton.addEventListener('click', () => {  // evento para hacer click a loguear usuario con contraseña
    let userEmail = containerLogin.querySelector('#emailField').value;
    let userPass = containerLogin.querySelector('#passwordField').value;
    firebaseLogin(userEmail, userPass);
  });
  const signupLink = containerLogin.querySelector('#userReg');
  signupLink.addEventListener('click', () => { // evento para llevar a usuario a la pantalla de registro con el #Register
  });
  const googleButton = containerLogin.querySelector('#googleLogin');
  googleButton.addEventListener('click', (e) => { // evento para loguear a usuario a través de Google
    firebaseGoogleLogin();
  });

  return containerLogin;
};
