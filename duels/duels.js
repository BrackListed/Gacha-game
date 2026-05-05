let storedCharacters = JSON.parse(localStorage.getItem("stored-characters")) || []
let selectionEl = document.querySelectorAll(".selection")
let selectedEl = document.getElementById("characterSelected")
let selectedCharacter = null
let startGame = document.getElementById("start-game")
let easy = document.getElementById("easy")
let medium = document.getElementById("medium")
let hard = document.getElementById("hard")
let impossible = document.getElementById("impossible")
let botDraw = null
let choseDifficulty = false
let botSelected = document.getElementById("botSelected")
let botimgPlaceholder = document.getElementById("botimg-placeholder")
let playerimgPlaceholder = document.getElementById("playerimg-placeholder")
let vsIcon = document.getElementById("vs-icon")
let hasCharacter = false
let playerAtk = null
let playerDef = null
let botAtk = null
let botDef = null
let botHealth = document.getElementById("bot-health")
let playerHealth = document.getElementById("player-health")
let winCount = parseInt(localStorage.getItem("win-count")) || 0
let lossCount = parseInt(localStorage.getItem("loss-count")) || 0
let playerStats = document.getElementById("player-stats")

const delay = (ms) => new Promise(res => setTimeout(res, ms))
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

playerStats.textContent = "Wins: " + winCount + " Losses: " + lossCount
selectionEl.forEach((chosableCharacters, index) => {
    chosableCharacters.addEventListener("click", function(){
        playerimgPlaceholder.innerHTML = ""
        let chosenCharacterimg = document.createElement("img")
        chosenCharacterimg.src = "../" + storedCharacters[index].img
        playerimgPlaceholder.appendChild(chosenCharacterimg)
        selectedCharacter = storedCharacters[index]
        hasCharacter = true
    })
    if(storedCharacters[index]){
        chosableCharacters.textContent = storedCharacters[index].name
        chosableCharacters.classList.remove("disabled")
    } else{
        chosableCharacters.disabled = true;
    }
});

startGame.addEventListener("click", function(){
    if(choseDifficulty === true && hasCharacter === true){
        vsIcon.classList.remove("disabled")
        botimgPlaceholder.innerHTML = ""
        let botImage = document.createElement("img")
        botImage.id = "bot-img"
        botImage.src = "../" + botDraw.img
        botimgPlaceholder.appendChild(botImage)
        botHealth.max = botDraw.Def
        playerHealth.max = selectedCharacter.Def
        renderGame()
        playerStats.textContent = "Wins: " + winCount + " Losses: " + lossCount
    } else{
        alert("Choose a difficulty and a character!")
    }

})


async function renderGame(){
    await delay(3000)
    playerAtk = selectedCharacter.Atk
    playerDef = selectedCharacter.Def
    botAtk = botDraw.Atk
    botDef = botDraw.Def
    while(playerDef > 0 && botDef > 0){
        await delay(1000)
        botDef = botDef - playerAtk
        botHealth.value = botDef
        if(botDef <= 0) break
        await delay(1000)
        playerDef = playerDef - botAtk
        playerHealth.value = playerDef
    }
    winChecktest()
}

function winChecktest(){
    if(playerDef <= 0){
        alert("You lost")
        botAtk = 0
        playerAtk = 0
        lossCount += 1
        refreshGame()
    } else if(botDef <= 0){
        alert("You win!")
        botAtk = 0
        playerAtk = 0
        winCount += 1
        refreshGame()
    } else if(playerDef <= 0 && botDef <= 0){
        alert("Draw!")
        botAtk = 0
        playerAtk = 0
        refreshGame()
    }
    JSON.stringify(localStorage.setItem("win-count", winCount))
    JSON.stringify(localStorage.setItem("loss-count", lossCount))

}

function refreshGame(){
    //need to set everything back, the player drawn and the draw of the bot the rest should naturally follow.
    //let the bot draw again, and the player just be the same, it's manual anyway
    botDraw = null
    playerimgPlaceholder.innerHTML = ""
    botimgPlaceholder.innerHTML = ""
    hasCharacter = false
    choseDifficulty = false
}
easy.addEventListener("click", function(){
    let easyIndex = Math.floor(Math.random() * commonCharacters.length)
    botDraw = commonCharacters[easyIndex]
    choseDifficulty = true
    botHealth.value = 1000
    playerHealth.value = 1000
})

medium.addEventListener("click", function(){
    let mediumIndex = Math.floor(Math.random() * rareCharacters.length)
    botDraw = rareCharacters[mediumIndex]
    choseDifficulty = true
    botHealth.value = 1000
    playerHealth.value = 1000
})

hard.addEventListener("click", function(){
    let hardIndex = Math.floor(Math.random() * legendaryCharacters.length)
    botDraw = legendaryCharacters[hardIndex]
    choseDifficulty = true
    botHealth.value = 1000
    playerHealth.value = 1000
})

impossible.addEventListener("click", function(){
    let impossibleIndex = Math.floor(Math.random() * mythicalCharacters.length)
    botDraw = mythicalCharacters[impossibleIndex]
    choseDifficulty = true
    botHealth.value = 1000
    playerHealth.value = 1000
})

