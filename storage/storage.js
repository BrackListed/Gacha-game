let characterRetrieval = JSON.parse(localStorage.getItem("playerCharacters"))
console.log(characterRetrieval)
let imgcontainer1 = document.getElementById("character1")

let characterImg = document.createElement("img")
characterImg.src = "../" + characterRetrieval.img
imgcontainer1.appendChild(characterImg)

