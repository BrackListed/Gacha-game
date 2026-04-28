let characterRetrieval = JSON.parse(localStorage.getItem("playerCharacters"))
console.log(characterRetrieval)
let imageContainers = document.querySelectorAll(".character")

let characterImg = document.createElement("img")
characterImg.src = "../" + characterRetrieval.img
imageContainers[0].appendChild(characterImg)

function storage1(){
    
}