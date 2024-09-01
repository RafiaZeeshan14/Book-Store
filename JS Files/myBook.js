// MyBooks.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
  const firebaseConfig = {
    apiKey: "AIzaSyCog3iTo-dbPq_32zI0UUq_W5-T9JOW8gk",
    authDomain: "shopping-cart-f7ca7.firebaseapp.com",
    databaseURL: "https://shopping-cart-f7ca7-default-rtdb.firebaseio.com",
    projectId: "shopping-cart-f7ca7",
    storageBucket: "shopping-cart-f7ca7.appspot.com",
    messagingSenderId: "678738300841",
    appId: "1:678738300841:web:2eedd3fe4859a2e861beb8",
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);

  const myBooksList = document.getElementById("my-books-list");
  const usernameDisplay = document.getElementById("username-display");
  const my_modal_5 = document.getElementById("my_modal_5");

  function showModalIfLinkUnavailable() {
    const modalContent = my_modal_5.querySelector(".modal-box");
    modalContent.innerHTML = `
            <h3 class="font-bold text-lg underline">Link Unavailable !</h3>
            <p class="py-4 font-medium">No link provided for this book to read.</p>
            <div class="modal-action">
                <button class="btn bg-slate-100 p-2 text-sm font-semibold rounded-lg" onclick="my_modal_5.close()">Close</button>
            </div>
        `;
    my_modal_5.showModal();
  }

  function attachReadBookLinkListener() {
    console.log('Attaching event listener for "Read Book" link');

    document
      .getElementById("my-books-list")
      .addEventListener("click", function (event) {
        console.log("Click event on my-books-list");
        const readBookLink = event.target.closest(".read-book-link");

        if (readBookLink) {
          event.preventDefault();
          const bookUrl = readBookLink.getAttribute("href");

          if (bookUrl) {
            console.log("Opening book URL:", bookUrl);
            window.open(bookUrl, "_blank");
          } else {
            console.log("No link available to read the book.");
            showModalIfLinkUnavailable();
          }
        }
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userBooksRef = ref(database, `Users/${user.uid}/userBooks`);
      const userRef = ref(database, `Users/${user.uid}`);
      // Retrieve the username from the database
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        const username = userData.username;

        // Update the HTML to display the username
        usernameDisplay.textContent = `Hello, ${username} !`;

        // Set the width to 100%
        usernameDisplay.style.width = "100%";
      });
      // Listen for changes in userBooksRef
      onValue(userBooksRef, (snapshot) => {
        // Clear existing book list
        myBooksList.innerHTML = "";

        // Iterate through each book in the snapshot
        snapshot.forEach((childSnapshot) => {
          const bookData = childSnapshot.val();
          // Create HTML elements to display the book
          const bookDiv = document.createElement("div");
          bookDiv.innerHTML = `<div class="w-full max-w-sm  ms-4">
                    <div class="flex  p-3 bg-black/40 shadow-lg rounded-lg overflow-hidden mb-2 h-52 border-[1px] border-white/35 ">
                        <div class="flex-shrink-0  ">
                          <img src="${bookData.imageUrl}" alt="Book image" class="w-28 h-auto shadow-xl rounded text-white"/>
                        </div>
                
                        <div class="flex flex-col justify-between ml-4">
                    
                            <div class="flex items-center space-x-1 ">
                             <div class="flex items-center space-x-1 rtl:space-x-reverse">
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            </div>
                            </div>
                            <h5 class="text-lg font-semibold mt-1 dark:text-gray-200">${bookData.title}</h5>
                            <h6 class="text-sm text-gray-600 mb-4 dark:text-gray-100">${bookData.author}</h6>
                            <a href="${bookData.BookUrl}" class='read-book-link underline mb-3 text-xs text-blue-600 hover:text-blue-800' target="_blank">
                            Read Book
                        </a>
                        
                        </div>
                          </div> 
             `;
          myBooksList.appendChild(bookDiv);
        });
      });
    }
  });
  attachReadBookLinkListener();
});
