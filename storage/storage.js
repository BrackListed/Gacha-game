let imageContainers = document.querySelectorAll(".character")
let storedCharacters = JSON.parse(localStorage.getItem("stored-characters")) || []
let nameContainers = document.querySelectorAll(".name")
let statContainers = document.querySelectorAll(".stats")
storedCharacters.forEach((characters, index) => {
    let characterImg = document.createElement("img")
    characterImg.src = "../" + characters.img
    imageContainers[index].appendChild(characterImg)
    nameContainers[index].textContent = characters.name
    statContainers[index].textContent = "Atk: " + characters.Atk + " Def: " + characters.Def
    imageContainers[index].classList.remove("disabled")
});
    


