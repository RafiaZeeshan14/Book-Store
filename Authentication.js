const firebaseConfig = {
    apiKey: "AIzaSyDttNhhQIQwy2Sdgo14HSYsnyohK_fRmb8",
    authDomain: "fir-class-c188e.firebaseapp.com",
    projectId: "fir-class-c188e",
    storageBucket: "fir-class-c188e.appspot.com",
    messagingSenderId: "267950652731",
    appId: "1:267950652731:web:00092a0a3d2892b0540b1e"
  };
  
  // Initialize Firebase
  const frb = firebase.initializeApp(firebaseConfig);
  console.log(frb.database)
  

  function Signup() {
    var SignUpEmail = document.getElementById("SignUpEmail");
    var SignUpPass = document.getElementById("SignUpPass");
  
    if (SignUpEmail.value.trim() === '' || SignUpPass.value.trim() === '') {
      // Display an alert or a modal prompting the user to enter email and password
      alert('Please enter your email and password');
      return; // Exit the function if email or password is empty
    }
  
    firebase.auth().createUserWithEmailAndPassword(SignUpEmail.value, SignUpPass.value)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("User created:", user);
  
        // Redirect after successful signup
        window.location.href = 'Login.html'; 
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Signup error:", errorMessage);
        // Handle signup errors if needed
      });

      
  }
  


function login() {
  var SignInEmail = document.getElementById("SignInEmail");
  var SignInPass = document.getElementById("SignInPass");
  console.log(SignInEmail.value, SignInPass.value)
  if (SignInEmail.value.trim() === '' || SignInPass.value.trim() === '') {
    // Display an alert or a modal prompting the user to enter email and password
    alert('Please enter your email and password');
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
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Login error:", errorMessage);
      // Handle login errors if needed
    });
}





function signInWithGoogle(){
  
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
  

  function SignInWithFacebook(){

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