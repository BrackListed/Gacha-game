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
function removeCharacter(index){
    storedCharacters.splice(index, 1)
    localStorage.setItem("stored-characters", JSON.stringify(storedCharacters))
    setTimeout(() => {
        location.reload();
    }, 0);
}




