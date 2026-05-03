let commonCharacters = [
    {name: "Takemichi Hanagaki", Atk: 10, Def: 10, img: "characters/Common/Takemichi_Hanagaki.png"},
    {name: "Haruka Sakura", Atk: 10, Def: 10, img: "characters/Common/Haruka_Sakura.png"},
]

let rareCharacters = [
    {name: "Tanjiro Kamado",  Atk: 60, Def: 50, img: "characters/Rare/Tanjiro_Kamado.png"},
    {name: "Gabimaru the Hollow", Atk: 30, Def: 40, img: "characters/Rare/Gabimaru.png"},
    {name: "Yuji Itadori", Atk: 50, Def: 50, img: "characters/Rare/Yuji_Itadori.png"},
    {name: "Alucard Hellsing", Atk: 40, Def: 40, img: "characters/Rare/Alucard_Hellsing.png"},
]

let legendaryCharacters = [
    {name: "Izuku Midoriya", Atk: 100, Def: 100, img: "characters/Legendary/Izuku_Midoriya.png"},
    {name: "Monkey D. Luffy", Atk: 110, Def: 120, img: "characters/Legendary/Luffy.jpg"},
]

let mythicalCharacters = [
    {name: "Giorno Giovanna", Atk: 80, Def: 999, img: "characters/Mythical/Giorno.png"},
    {name: "Saitama", Atk: 500, Def: 500, img: "characters/Mythical/Saitama.png"},
]

let characterDeck = [...commonCharacters, ...rareCharacters, ...legendaryCharacters, ...mythicalCharacters]


let cardPage = document.querySelector(".card-page")
let characterName = document.querySelector(".character-name")
let characterStats = document.querySelector(".stats")
let imgContainer = document.querySelector(".imagecontainer")
let storedCharacters = JSON.parse(localStorage.getItem("stored-characters")) || []
let characterSelection = null


function getCharacter(){
    let commonIndex = Math.floor(Math.random() * commonCharacters.length)
    let rareIndex = Math.floor(Math.random() * rareCharacters.length)
    let legendaryIndex = Math.floor(Math.random() * legendaryCharacters.length)
    let mythicalIndex = Math.floor(Math.random() * mythicalCharacters.length)
    let characterIndex = Math.floor(Math.random() * 100) + 1;
    if(characterIndex < 60){
        characterSelection = commonCharacters[commonIndex]
    } else if(characterIndex >= 60 && characterIndex < 90 ){
        characterSelection = rareCharacters[rareIndex]
    } else if(characterIndex >= 90 && characterIndex < 100){
        characterSelection = legendaryCharacters[legendaryIndex]
    } else{
        characterSelection = mythicalCharacters[mythicalIndex]
    }
    let characterImg = document.createElement("img")

    characterImg.src = characterSelection.img
    imgContainer.appendChild(characterImg)
    characterName.textContent = characterSelection.name
    characterStats.textContent = "Atk: " + characterSelection.Atk + " Def: "  + characterSelection.Def
}


function startFunction(){
    imgContainer.innerHTML = ""
    getCharacter()
}

function characterStorage(){
    if(storedCharacters.length >= 10){
        alert("You already have 10 characters stored! Go to the storage section and delete some first!")
    } else {
        localStorage.setItem("playerCharacters", JSON.stringify(characterSelection))
        storedCharacters.push(characterSelection)
        localStorage.setItem("stored-characters", JSON.stringify(storedCharacters))
    }

}

function storageFunction() {
    window.location.href = "storage/storage.html";
}

function battleFunction() {
    window.location.href = "duels/duels.html";
}

console.log(storedCharacters)