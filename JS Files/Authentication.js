
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCog3iTo-dbPq_32zI0UUq_W5-T9JOW8gk",
  authDomain: "shopping-cart-f7ca7.firebaseapp.com",
  databaseURL: "https://shopping-cart-f7ca7-default-rtdb.firebaseio.com",
  projectId: "shopping-cart-f7ca7",
  storageBucket: "shopping-cart-f7ca7.appspot.com",
  messagingSenderId: "678738300841",
  appId: "1:678738300841:web:2eedd3fe4859a2e861beb8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const database = app.database();

// Initialize Firebase
// const frb = firebase.initializeApp(firebaseConfig);
// const auth = frb.auth();


function Signup() {
  const enteredUsername = document.getElementById('username').value;
  var SignUpEmail = document.getElementById("SignUpEmail");
  var SignUpPass = document.getElementById("SignUpPass");
  var errorModal = document.getElementById("errorModal");
  var errorMessageElement = document.getElementById("errorMessage");
  var closeModal = document.getElementById("closeModal");


   // Function to show the modal
   function showModal(message) {
    errorMessageElement.textContent = message;
    errorModal.classList.remove("hidden");
  }

  // Function to hide the modal
  closeModal.addEventListener("click", function() {
    errorModal.classList.add("hidden");
  });


  if (SignUpEmail.value.trim() === '' || SignUpPass.value.trim() === '') {
    // Display an alert or a modal prompting the user to enter email and password
    showModal('Please enter your email and password');
    return; // Exit the function if email or password is empty
  }

  firebase.auth().createUserWithEmailAndPassword(SignUpEmail.value, SignUpPass.value)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("User created:", user);
      console.log("Entered username:", enteredUsername);
      return firebase.database().ref('Users/' + user.uid).set({
        username: enteredUsername,
      });

      // Redirect after successful signup
      // window.location.href = 'Login.html';
    })
    .then(() => {
      console.log('Database operation successful. Redirecting...');
      // Redirect after successful signup
      window.location.replace('Login.html');
   })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Signup error:", errorMessage);
      showModal(errorMessage);
    });


}

function login() {
  var SignInEmail = document.getElementById("SignInEmail");
  var SignInPass = document.getElementById("SignInPass");
  var errorModal = document.getElementById("errorModal");
  var errorMessageElement = document.getElementById("errorMessage");
  var closeModal = document.getElementById("closeModal");

  // Function to show the modal
  function showModal(message) {
    errorMessageElement.textContent = message;
    errorModal.classList.remove("hidden");
  }

  // Function to hide the modal
  closeModal.addEventListener("click", function() {
    errorModal.classList.add("hidden");
  });

  if (SignInEmail.value.trim() === '' || SignInPass.value.trim() === '') {
    showModal('Please enter your email and password');
    return; // Exit the function if email or password is empty
  }

  firebase.auth().signInWithEmailAndPassword(SignInEmail.value, SignInPass.value)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("User logged in:", user);

      // Redirect after successful login
      window.location.href = 'UserHomePage.html';
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.error("Login error:", errorMessage);
      showModal("Invalid Credentials"); 
    });
}





function signInWithGoogle() {

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log(user)
      window.location.href = 'UserHomePage.html';
      // IdP data available in result.additionalUserInfo.profile.
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorMessage)
    });

}


function SignInWithFacebook() {

  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;
      console.log(user)
      window.location.href = 'UserHomePage.html';
      // IdP data available in result.additionalUserInfo.profile.
      // ...

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      console.log(errorMessage)
    });


}