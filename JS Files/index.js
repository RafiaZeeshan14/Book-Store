import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js';

document.addEventListener("DOMContentLoaded", function () {

    const firebaseConfig = {
        databaseURL: "https://shopping-cart-f7ca7-default-rtdb.firebaseio.com/"
    };
    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app)
    const BooksInDB = ref(database, "Books")  //(which database you working , what databse should call)

    // Function to display books in a card
    function displayBooks(books) {
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = ""; // Clear the card container before displaying books

        //session storage email name unique
        // const newarr = bookkkkkkk.filter()

        books.forEach((book) => {
            const card = document.createElement('div');
            card.innerHTML = `<div class="w-full max-w-sm ">
        <div class="flex p-3 bg-white shadow-lg rounded-lg overflow-hidden mb-2 h-52 border-[1px] border-black/35 ">
            <div class="flex-shrink-0  ">
              <img src="${book.imageUrl}" alt="Book Image" class="w-28 h-auto shadow-xl rounded"/>
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
                <h5 class="text-lg font-semibold mt-1">${book.title}</h5>
                <h6 class="text-sm text-gray-600 mb-4">${book.author}</h6>
                <a href="${book.BookUrl}" class='read-book-link underline text-blue-600 mb-3 text-xs hover:text-blue-800 rel="noopener noreferrer" target="_blank" ' >Read Book</a> 
             
                <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 ">
               <button type="button" class="add-to-heart-button w-32 rounded-md border border-black px-3 py-2 hover:bg-black hover:text-white text-xs font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" data-book='${JSON.stringify(book)}'>
                 Add To  <span class='ml-2'>&#10084;</span>  
               </button>  
                 </div>
            </div>
        </div>
    </div> `;
            cardContainer.appendChild(card);

        })
    }
    function attachReadBookLinkListener() {
        console.log('Attaching event listener for "Read Book" link');
    
        document.getElementById('card-container').addEventListener("click", function (event) {
            console.log('Click event on card-container');
            const readBookLink = event.target.closest('.read-book-link');
            if (readBookLink) {
                event.preventDefault();
                const bookUrl = readBookLink.getAttribute('href');
    
                if (bookUrl) {
                    console.log('Opening book URL:', bookUrl);
                    window.open(bookUrl, '_blank');
                } else {
                    console.log('No link available to read the book.');
                    my_modal_5.showModal()
                }
            }
        });
    }

    // Fetch books from Firebase Realtime Database and display them
    onValue(BooksInDB, (snapshot) => {
        const booksData = snapshot.val();
        if (booksData) {
            const booksArray = Object.values(booksData);
            displayBooks(booksArray);
            attachReadBookLinkListener(); // Attach the event listener after displaying books
        } else {
            console.log('No books available');
        }
    });
    

});






































