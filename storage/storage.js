let imageContainers = document.querySelectorAll(".character")
let storedCharacters = JSON.parse(localStorage.getItem("stored-characters")) || []
let nameContainers = document.querySelectorAll(".name")
let statContainers = document.querySelectorAll(".stats")
let backgroundSelector = document.querySelectorAll("background")


storedCharacters.forEach((characters, index) => {
    let characterImg = document.createElement("img")
    characterImg.src = "../" + characters.img
    imageContainers[index].appendChild(characterImg)
    nameContainers[index].textContent = characters.name
    statContainers[index].textContent = "Atk: " + characters.Atk + " Def: " + characters.Def
    imageContainers[index].classList.remove("disabled")


});



//premise was wrong, i was looping thru each "character" to check if they've got a 1 or 2
//the thing im supposed to be doing is once this thing is clicked, remove the character
//if the characters is at the foreach then wtf can i do
//no they're not at foreach they're at storedcharacters


