let storedCharacters = JSON.parse(localStorage.getItem("stored-characters")) || []
let selectionEl = document.querySelectorAll(".selection")
let selectedEl = document.getElementById("characterSelected")


selectionEl.forEach((chosableCharacters, index) => {
    console.log(chosableCharacters)
    chosableCharacters.addEventListener("click", function(){
        selectedEl.innerHTML = ""
        let chosenCharacter = document.createElement("img")
        chosenCharacter.src = "../" + storedCharacters[index].img
        selectedEl.appendChild(chosenCharacter)
    })
    chosableCharacters.textContent = storedCharacters[index].name
});



//I've made it so that the buttons now are able to well display the characters, but that's only display. THe buttons need to be clicked and when clicked 
//invoke and select the character then append it on chosen character