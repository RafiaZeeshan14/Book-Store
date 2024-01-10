function showDialog(event) {
    event.preventDefault(); // Prevent default form submission behavior

    let dialog = document.getElementById('dialog');
    dialog.classList.remove('hidden');
    setTimeout(() => {
      dialog.classList.remove('opacity-0');
    }, 20);
  }

  function hideDialog() {
    let dialog = document.getElementById('dialog');
    dialog.classList.add('opacity-0');
    setTimeout(() => {
      dialog.classList.add('hidden');
    }, 500);
  }