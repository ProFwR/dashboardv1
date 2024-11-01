 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
 
 const firebaseConfig = {
  apiKey: "AIzaSyDrCY6F7oVyghrYT_QAPE-oycFzUriCvOU",
  authDomain: "dashboard-2ed10.firebaseapp.com",
  databaseURL: "https://dashboard-2ed10-default-rtdb.firebaseio.com",
  projectId: "dashboard-2ed10",
  storageBucket: "dashboard-2ed10.appspot.com",
  messagingSenderId: "303994675790",
  appId: "1:303994675790:web:29a145cb8c843852e7591f",
  measurementId: "G-7NL5K9DM4V"
};

 // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const card_dataRef = firebase.database().ref("Data/");
const chart_dataRef = firebase.database().ref("Data/chart");
const usersRef = firebase.database().ref('Users');


export function chartData() {
  return new Promise((resolve, reject) => {
    chart_dataRef.once('value', (snapshot) => {
      let userData = snapshot.val();
      resolve(userData); // Resolve with the fetched data
    }, (error) => {
      console.error("Error reading data: ", error);
      reject(error); // Reject with the error
    });
  });
}

export function readCardData() {
  return new Promise((resolve, reject) => {
    const values = [];
    card_dataRef
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let data = childSnapshot.val();
          values.push(data);
        });
        resolve(values);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getUserByName(name) {
  return new Promise((resolve, reject) => {
      usersRef.orderByChild('name').equalTo(name).once('value', (snapshot) => {
          if (snapshot.exists()) {
              const users = [];
              snapshot.forEach((childSnapshot) => {
                  users.push(childSnapshot.val());
              });
              resolve(users); 
          } else {
              resolve([]); 
          }
      }, (error) => {
          reject(error);
      });
  });
}





const signIn=document.getElementById('login-form');
const rememberMeCheckbox = document.getElementById('rememberMe');

export function login(){
  signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('yourUsername').value;
    const password=document.getElementById('yourPassword').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth , email,password)
    .then((userCredential)=>{
        console.log('login is successful', 'signInMessage');
        if (rememberMeCheckbox.checked) {
          // Use localStorage to remember user
          const user=userCredential.user;
          console.log("======================================")
          localStorage.setItem('loggedInUserId', user.uid);
          return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        }
        
    }).then(() => {
      // Now, the user's session will be persisted for 30 days
      console.log("User logged in and session persisted for 30 days.");
      window.location.href='index.html';
      // Redirect to another page or update UI
      })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
          console.log('Incorrect Email or Password', 'signInMessage');
        }
        else{
          console.log('Account does not Exist', 'signInMessage');
        }
    })
 });

}




// // Set up our register function
// function register () {
//   // Get all our input fields
//   email = document.getElementById('email').value
//   password = document.getElementById('password').value
//   full_name = document.getElementById('full_name').value
//   favourite_song = document.getElementById('favourite_song').value
//   milk_before_cereal = document.getElementById('milk_before_cereal').value

//   // Validate input fields
//   if (validate_email(email) == false || validate_password(password) == false) {
//     alert('Email or Password is Outta Line!!')
//     return
//     // Don't continue running the code
//   }
//   if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
//     alert('One or More Extra Fields is Outta Line!!')
//     return
//   }
 
//   // Move on with Auth
//   auth.createUserWithEmailAndPassword(email, password)
//   .then(function() {
//     // Declare user variable
//     var user = auth.currentUser

//     // Add this user to Firebase Database
//     var database_ref = database.ref()

//     // Create User data
//     var user_data = {
//       email : email,
//       full_name : full_name,
//       favourite_song : favourite_song,
//       milk_before_cereal : milk_before_cereal,
//       last_login : Date.now()
//     }

//     // Push to Firebase Database
//     database_ref.child('users/' + user.uid).set(user_data)

//     // DOne
//     alert('User Created!!')
//   })
//   .catch(function(error) {
//     // Firebase will use this to alert of its errors
//     var error_code = error.code
//     var error_message = error.message

//     alert(error_message)
//   })
// }


// // Validate Functions
// export default  function validate_email(email) {
//   expression = /^[^@]+@\w+(\.\w+)+\w$/
//   if (expression.test(email) == true) {
//     // Email is good
//     return true
//   } else {
//     // Email is not good
//     return false
//   }
// }

// function validate_password(password) {
//   // Firebase only accepts lengths greater than 6
//   if (password < 6) {
//     return false
//   } else {
//     return true
//   }
// }

// function validate_field(field) {
//   if (field == null) {
//     return false
//   }

//   if (field.length <= 0) {
//     return false
//   } else {
//     return true
//   }
// }












// export function fetchData() {
//   return new Promise((resolve, reject) => {
//     let fetchedData = {};

//     // Fetch chart data from Data/chart
//     chart_dataRef.once('value', (chartSnapshot) => {
//       fetchedData.chart = chartSnapshot.val();
//       // Fetch date data from Data/Date
//       date_dataRef.once('value', (dateSnapshot) => {
//         fetchedData.date = dateSnapshot.val();
//         resolve(fetchedData); 
//       }, (dateError) => {
//         console.error("Error reading date data: ", dateError);
//         reject(dateError); // Reject with the error
//       });
//     }, (chartError) => {
//       console.error("Error reading chart data: ", chartError);
//       reject(chartError); // Reject with the error
//     });
//   });
// }




