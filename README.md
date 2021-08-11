# BEARHUG

## Índice

* [BearHug](#bearhug)
* [Interfaz](#interfaz)
* [Prototipos](#prototipos)
* [Historias de usuario](#historias-de-usuario)
* [Test de usabilidad](#test-de-usabilidad)
* [Tecnologías](#tecnologías)
* [Enlace](#enlace)

## BearHug 
Es una red social enfocada en el apoyo y contención para personas afectadas por la crisis pandémica del COVID-19. 
Sus principales usuarios son personas que se encuentran solas, enfermas o con relaciones conflictivas provocadas por el encierro y el miedo a la incertidumbre. 
Y que deseen compartir sus experiencias a través de conversaciones, en donde puedan sentirse identificados y crear conexiones más cercanas.

Toda la informacion se actualiza de manera inmediata: permite que los usuarios pueden estar en contacto desde cualquier parte del mundo en tiempo real.
Cada publicación puede contener un máximo de 280 caracteres, siendo breve y eficiente el consumo de información. 
Para publicar, los usuarios pueden registrarse mediante correo electrónico y contraseña, o a través de Google.
Cada usuario tiene un perfil único, donde puede entregar información personal en los recuadross "biografía" e "intereses", los que puede editar cuando se desee. En esta misma sección el usuario puede visualizar sus propios posts.

Respecto a las interacciones, se pueden otorgar "likes" (máximo 1 por usuario) por cada publicación en el muro, tambien eliminar y editar los posts creados por el mismo, ayudando a crear una mejor experiencia.

## Interfaz
### Móvil

![mobile](https://user-images.githubusercontent.com/83680798/129109471-a55be354-38f2-4e70-aafa-7765ed25c6b6.gif)

### Escritorio
<details>
<summary> Clic para ver la interfaz de escritorio </summary>

![desktop1](https://user-images.githubusercontent.com/83680798/129101985-98eabd45-8a85-44ff-84c0-c278fd882cf3.png)
![desktop2](https://user-images.githubusercontent.com/83680798/129104285-4fa38dd6-5de2-4dff-b6de-115f5b526bd8.png)
![desktop2-1](https://user-images.githubusercontent.com/83680798/129104293-fea5bfe3-442f-46f3-958c-2fe5e35775ee.png)
![desktop3](https://user-images.githubusercontent.com/83680798/129104327-9b01e582-ca55-48c3-b12f-9d12a0789b22.png)
![desktop4](https://user-images.githubusercontent.com/83680798/129104524-8524049d-6a06-4c43-8136-ca1800bd07b2.png)

</details>

## Prototipos
### 1. Diseño
En el proceso del desarrollo de la página se pensó en la experiencia del público objetivo, brindando una página minimalista con colores que reflejen lo que esperamos los usuarios busquen en BearHug. 

![JustificacionDelDiseño](./src/images/JustificacionDelDiseño.png)

Como resultado se definió una paleta basada en 3 colores pricipales, y un logotipo que hace referencia a la esencia de la red: el abrazo de un oso.

### 2. Prototipos baja fidelidad:
<details>

![Prototipo-inicial](./src/images/diseñoBajaFidelidad.png)
</details>

### 3. Prototipo alta fidelidad:
#### Móvil
![iPhone 8 - 1](https://user-images.githubusercontent.com/83680798/129110676-ddaf03bf-b2cb-4761-b1d5-0977f22d702e.png)
![iPhone 8 - 2](https://user-images.githubusercontent.com/83680798/129110675-3c50eec5-b0be-4d15-8edf-93ca85c297d7.png)
![iPhone 8 - 3](https://user-images.githubusercontent.com/83680798/129110671-ff49a520-9d74-4b4d-9378-d643830b920c.png)
![iPhone 8 - 4](https://user-images.githubusercontent.com/83680798/129110668-87ec5b29-6950-4067-b067-eb2063ebbbed.png)

#### Escritorio

<details>
<summary> Clic para ver los prototipos de escritorio </summary>
  
![Desktop - 1](https://user-images.githubusercontent.com/83680798/129111066-6fdde698-3318-4040-a670-b369b56227de.png)
![Desktop - 2](https://user-images.githubusercontent.com/83680798/129111064-3ab1ffcb-59b4-4b59-9952-479adcb7e40b.png)
  
</details>

[Prototipos en Figma](https://www.figma.com/proto/UAiGqTbsTUJqxgKLDGfsPS/Team-Yoyo---BearHug?node-id=258%3A68&scaling=scale-down&page-id=0%3A1)


## Historias de usuario
### 1. Quiero una aplicación simple, donde pueda registrarme por correo o Google, para crear conexiones.
````
CRITERIOS DE ACEPTACIÓN:
- Una sola pantalla que permita registro o inicio de sesión.
- Conectar login con Firebase.
- Validar cuenta con Firebase.
- Diseño mobile first.

DEFINICIÓN DE TERMINADO
- Creación de rutas.
- Html dinámico.
- Distribucion de elemento con Css Grid.
- Funciones de Firebase: Init, Register, Login(correo, google), Logout.
````
### 2. Quiero poder compartir mi situacion a través de posts.
````
CRITERIOS DE ACEPTACIÓN:
- Una pantalla que permita visualizar los posts.
- Una pantalla para crear publicaciones.
- Al publicar se debe validar que haya contenido en el input.
- Al recargar se debe verificar si el usuario está logueado para mostrar el contenido.

DEFINICIÓN DE TERMINADO:
- Uso de funciones de Firebase.
- Creación de colección 'post' en Firestore Database.
- Se sube data que el usuario ingresa a los post a la colección de Firestore.
- Uso de RealTimeListener.
- En escritorio el usuario puede crear posts desde la misma pantalla de home.
- Escritorio y móvil contienen un modal para crear posts. En móvil ocupa toda la pantalla.
- Se crea una condición para exigir al usuario publicar con texto con un máximo de 280 caracteres.

````
### 3. Quiero poder eliminar y editar mis publicaciones, y darle like a los posts de otras personas.
````
CRITERIOS DE ACEPTACIÓN:
- Poder eliminar un post específico. 
- Pedir confirmación antes de eliminar un post.
- Poder editar posts del propio usuario. 
- Poder dar y quitar like a una publicación. Máximo uno por usuario.

DEFINICIÓN DE TERMINADO:
- Añadir elementos (botones) de interacción. 
- Subir a la colección de 'post' el ID del usuario conectado. 
- Implementar una condición que compara el ID del usuario conectado con la ID de los posts publicados.
- Aplicación de método update de Firebase para actualizar los posts editados.
- Crear función y animación de like. Incluye un contador.

````
### 4. Quiero tener un perfil donde pueda tener información sobre mí y editarlo.
````
CRITERIOS DE ACEPTACIÓN:
- Crear una pantalla que contenga un perfil. 
- Manipular visualizar la data entregada por el usuario. 
- Visualizar imagen y nombre de usuario.
- Modal para editar perfil.![mobile](https://user-images.githubusercontent.com/83680798/129109392-a56fbd78-874b-4d35-b4f3-ec2d1de7e812.gif)
![mobile](https://user-images.githubusercontent.com/83680798/129109420-49f6578d-2d8f-4d56-8f31-ef474a979cbc.gif)

- Botón que actualice el perfil.

DEFINICIÓN DE TERMINADO:
- Ruta de perfil.
- Perfil reemplaza el template de posts en el contenedor de feed.
- Crear una nueva colección con la data de los usuarios. 
- Diseño de modal para edición de la información del usuario (nombre, foto, biografia y intereses).
- Aplicación de métodos updateProfile y update.
````
### 5. Quiero poder compartir imágenes en mis posts.
````
CRITERIOS DE ACEPTACIÓN:
-  Subir imágenes al post.
-  Botón de cargar imágenes. 
-  La imagen se debe cargar al momento de compartir.
-  Se debe permitir publicar posts sin fotos. 

DEFINICIÓN DE TERMINADO:
- Subir imagen a Firebase Storage.
- Bajar imagen del storage y subirla a la colección de Firestore.
- Límite de una foto por post.
- La imagen se carga al postear.
````
## Test de usabilidad

Se implementaron tres tests de usabilidad durante este proyecto:

|<sub> HISTORIA DE USUARIO 	|<sub>EDAD USUARIO 	|<sub> FUNCIONALIDAD 	|<sub>DISEÑO 	|<sub>EXPERIENCIA DE USUARIO	</sub>|
|---	|---	|---	|--- |---	|
|<sub>H.U. 1	| <sub>32 años |   <sub>En desktop, la página no permite apretar "enter" e ingresar o registrarse, según corresponda. En desktop y mobile se debe hacer clic o touch justo en la palabra "ingresar" o "registrar" para que se genere la acción. Esto es particularmente incómodo en celular.   	|  <sub>Diseño limpio. Buena tipografía. Buen funcionamiento de los inputs. 	|  <sub>Web intuitiva. Es claro lo que se debe hacer en cada ventana.  Le gusta el mensaje que indica que un correo fue enviado para validar la cuenta creada. De esa forma puede saber que efectivamente se ha registrado.	|
|   <sub>H.U. 2 Y 3	|  <sub>26 años  	|   <sub>En desktop, el campo para publicar no está bien delimitado, al eliminar no muestra mensaje de confirmación por si se arrepiente |  <sub>Buena distribución de elementos. Diseño minimalista y con estilo fresco y actual. Se confunde el botón de publicar con el de editar.	|   <sub>Buena experiencia, aunque corregiría los detalles mencionados para mejorar la experiencia. |
|<sub>H.U. 4 Y 5	|  <sub>30 años  |  <sub>Página intuitiva.	Tanto en móvil como en computador es cómodo de usar.	|   <sub>Buenos colores. Le agrada la animación de dar "like", aunque le molesta que el contador aparezca en color cuando no se ha dado un like todavia. Le agrada que se pueda postear directamente en pantalla y a través de un modal, pues incentiva a compartir (postear). |   <sub>	Muy buena. Le agrada poder subir imágenes a los posts, así como editar su propio perfil. Le gustaría que se implementaran los comentarios.|
  
Gracias a estos, se pudieron realizar algunas mejoras a la funcionalidad y diseño, así como dejar otras para el futuro.

## Tecnologías
### El proyecto está creado con:

- HTML
- CSS
- JavaScript
- NodeJs
- Firebase


## Enlace
[BearHug](https://gabbyholics.github.io/SCL017-social-network/) 🐻
