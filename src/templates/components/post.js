import { firebaseGetDatabase } from '../../lib/firebase.js';
import { deleteButton } from './deletePost.js';
import { editButton } from './editPost.js';
import { likeButton } from './likePost.js';

export const postTemplate = () => {
  const containerAddPost = document.createElement('section');
  const publicPost = document.createElement('ul');
  publicPost.id = 'publicPost';
  publicPost.className = 'containerPublicPost';
  containerAddPost.className = 'containerAddPost';

  const addPost = `
  <div class="containerPost" id="containerPost">
  <div class="feedPostInfo" id="feedPostInfo">
    <img src="./images/ejemploperfilfoto.png" class="feedPicProfile"> 
    <textarea id="text-description" class="createPostText" maxlength ="260" rows="2" colums="20" placeholder ="Descríbelo aquí"></textarea>
  </div>
  <div class="footerPost" id="footerPost">
    <a id="uploadImage" class="uploadImgBtn">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5352 16C21.8665 16 21.242 16.3342 20.8711 16.8906L19.4648 19H17C15.8954 19 15 19.8954 15 21V30C15 31.1046 15.8954 32 17 32H31C32.1046 32 33 31.1046 33 30V21C33 19.8954 32.1046 19 31 19H28.5352L27.1289 16.8906C26.758 16.3342 26.1335 16 25.4648 16H22.5352ZM22.5352 18H25.4648L26.8711 20.1094C27.242 20.6658 27.8665 21 28.5352 21H31V30H17V21H19.4648C20.1335 21 20.758 20.6658 21.1289 20.1094L22.5352 18ZM26 25C26 26.1046 25.1046 27 24 27C22.8954 27 22 26.1046 22 25C22 23.8954 22.8954 23 24 23C25.1046 23 26 23.8954 26 25ZM28 25C28 27.2091 26.2091 29 24 29C21.7909 29 20 27.2091 20 25C20 22.7909 21.7909 21 24 21C26.2091 21 28 22.7909 28 25Z" fill="#222222"/>
      </svg>
    </a>
    <button id="postButton" class="postButtonLink">Compartir</button>
  </div>
  </div>`;

  containerAddPost.innerHTML = addPost;
  const containerPost = containerAddPost.querySelector('#containerPost');
  const textDescription = containerPost.querySelector('#text-description');
  const postButton = containerAddPost.querySelector('#postButton');
  postButton.addEventListener('click', async (e) => {
    e.preventDefault();
    saveData(textDescription.value);
    textDescription.value = '';
  });

  const uploadImage = containerAddPost.querySelector('#uploadImage');
  uploadImage.addEventListener('click', () => {

  });

  function uploadUserImg () {
    const storageRef = firebase.storage().ref();

  }

  containerAddPost.appendChild(publicPost);
  return containerAddPost;
};

export const viewPost = (doc, publicPost, isFirstElement) => {
  const postsList = document.createElement('li');
  const indPostWrapper = document.createElement('div');
  const usernameDisplay = document.createElement('div'); // div para nombre usuario
  const onlyTextWrapper = document.createElement('div');
  const timePost = document.createElement('div');
  const userPicture = document.createElement('img'); // div para imagen de usuario (por defecto por ahora)
  const postedText = document.createElement('span');
  const interactionElements = document.createElement('div');
  const currentUserId = firebase.auth().currentUser.uid; // Id del usuario conectado
  const userDataObject = doc.data(); // guardamos las prop. del objeto post

  usernameDisplay.id = 'usernameDisplay';
  timePost.id = 'timePost';
  userPicture.id = 'userPicture';
  postedText.id = 'postedTextId';

  postsList.className = 'li';
  indPostWrapper.className = 'indPostWrapper';
  timePost.className = 'timeStamp';
  onlyTextWrapper.className = 'onlyTextWrapper';
  userPicture.className = 'userProfilePic';
  usernameDisplay.className = 'nameDisplay';
  postedText.className = 'postedText';
  interactionElements.className = 'interactionWrapper';

  postsList.setAttribute('data-id', doc.id);
  postedText.textContent = userDataObject.textDescription;
  const postTimestamp = userDataObject.timestamp;
  if (postTimestamp != null) {
    const shortTime = `${postTimestamp.toDate().toDateString()} ${postTimestamp.toDate().toLocaleTimeString()}`;
    timePost.innerHTML = shortTime;
  }

  // se imprime el nombre de usuario en los posts publicados
  usernameDisplay.innerHTML = userDataObject.username;
  userPicture.src = userDataObject.userPic; // se agrega la foto por defecto en el post publicado

  if (isFirstElement) {
    publicPost.prepend(postsList);
  } else {
    publicPost.appendChild(postsList);
  }

  postsList.appendChild(indPostWrapper);
  indPostWrapper.appendChild(userPicture);
  indPostWrapper.appendChild(onlyTextWrapper);
  onlyTextWrapper.appendChild(usernameDisplay);
  onlyTextWrapper.appendChild(timePost);
  onlyTextWrapper.appendChild(postedText);
  
  postsList.appendChild(interactionElements);

  /* si la id del usuario del post es la misma que la id del usuario conectado,
  se agrega el botón de eliminar y editar */
  if (userDataObject.userId === currentUserId) {
    interactionElements.appendChild(deleteButton());
    interactionElements.appendChild(editButton());
  }

  // se agrega parámetro del largo del array para saber si posee o no likes
  const likeBtn = likeButton(userDataObject.likes.length);

  // si el usuario le hizo like con anticipación, al dibujarse el botón de like...
  if (userDataObject.likes.includes(currentUserId)) {

    // se añade la clase is_red para mantener el rojo del corazón
    likeBtn.classList.add('is_already_liked');
  }
  interactionElements.appendChild(likeBtn);
  interactionElements.appendChild(commentButton());
};

// parámetro textDescription es textDescription.value (es un string)
export const saveData = async (textDescription) => {
  if (textDescription.length == '') {
    alert('Recuerda, para conectar necesitas expresarte ');
  } else {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const userId = firebase.auth().currentUser.uid;
    const username = firebase.auth().currentUser.displayName;
    const userPic = firebase.auth().currentUser.photoURL;
    await firebaseGetDatabase().collection('post').add({
      textDescription: textDescription,
      timestamp: timestamp,
      userId: userId, // ID de usuario
      username: username, // nombre usuario
      userPic: userPic, // foto por defecto usuario
      likes:[], // like
    });
  
  }
};

const commentButton = () => {
  const comment = document.createElement('img');
  comment.className = ('commentPost');
  comment.src = './images/commentpost.svg';
  return comment;
};

export const realtimeListener = () => {
  firebaseGetDatabase().collection('post')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      const publicPost = document.getElementById('publicPost');
      if (publicPost != null) {
        const changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type === 'added') {
            viewPost(change.doc, publicPost, change.newIndex === 0);
          } else if (change.type === 'modified') {
            const postsList = publicPost.querySelector(`[data-id="${change.doc.id}"]`);
            postsList.querySelector('#postedTextId').textContent = change.doc.data().textDescription;
            const postTimestamp = change.doc.data().timestamp;
            if (postTimestamp != null) {
              const shortTime = `${postTimestamp.toDate().toDateString()} ${postTimestamp.toDate().toLocaleTimeString()}`;
              postsList.querySelector('#timePost').innerHTML = shortTime;
            }
          } else if (change.type === 'removed') {
            const postsList = publicPost.querySelector(`[data-id="${change.doc.id}"]`);
            publicPost.removeChild(postsList);
          }
        });
      }
    });
};
