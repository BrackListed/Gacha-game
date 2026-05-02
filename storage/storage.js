let imageContainers = document.querySelectorAll(".character")
let storedCharacters = JSON.parse(localStorage.getItem("stored-characters")) || []
let nameContainers = document.querySelectorAll(".name")
let statContainers = document.querySelectorAll(".stats")
storedCharacters.forEach((characters, index) => {
    let characterImg = document.createElement("img")
    characterImg.src = "../" + characters.img
    let dictateLength = 0
    dictateLength += index
    imageContainers[dictateLength].appendChild(characterImg)
    nameContainers[index].textContent = characters.name
    statContainers[index].textContent = "Atk: " + characters.Atk + " Def: " + characters.Def
});
    


