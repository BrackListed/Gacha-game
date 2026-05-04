let storedCharacters = JSON.parse(localStorage.getItem("stored-characters")) || []
let selectionEl = document.querySelectorAll(".selection")


selectionEl.forEach((chosableCharacters, index) => {
    chosableCharacters.textContent = storedCharacters[index].name
});



    //make it so that when this thing loops thru all the buttons, it also changes each innerhmtl based on the storedcharacters, so basically the first button
    //characterthings[0] = storedcharacters[0] so yeha
    //I'm only accessing the array, not the object, let's try to access it