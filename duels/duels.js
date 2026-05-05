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
        //selectedCharacter = player's character
        //botDraw = bot's character

        //player  attacks first, player's dmg subtracts bot hp, bot attacks, bot's dmg subtracts player hp,  do this whiile either the player or bot lives
    } else{
        alert("Choose a difficulty and a character!")
    }
})

function renderGame(){
    let playerAtk = selectedCharacter.Atk
    let playerDef = selectedCharacter.Def
    let botAtk = botDraw.Atk
    let botDef = botDraw.Def
    while(playerDef > 0 && botDef > 0){
        //what this does is as long as player def is greater than 0 OR bot def is greater than 0, keep 
        //killing each other. We don't want that, as soon as one value becomes false the rest should become false
        //WE USE AND NOT OR
        botDef = botDef - playerAtk
        playerDef = playerDef - botAtk
        botHealth.value = botDef
        playerHealth.value = playerDef
        console.log(playerDef)
        console.log(botDef)
    }
    //how about creating a while loop taht while playerdef and botdef are still not null, keep the cycle going
    //wherein player does dmg, bot takes dmg, bot does dmg, player takes dmg
}

function winnerChecker(){
}

easy.addEventListener("click", function(){
    let easyIndex = Math.floor(Math.random() * commonCharacters.length)
    botDraw = commonCharacters[easyIndex]
    choseDifficulty = true
})

medium.addEventListener("click", function(){
    let mediumIndex = Math.floor(Math.random() * rareCharacters.length)
    botDraw = rareCharacters[mediumIndex]
    choseDifficulty = true
})

hard.addEventListener("click", function(){
    let hardIndex = Math.floor(Math.random() * legendaryCharacters.length)
    botDraw = legendaryCharacters[hardIndex]
    choseDifficulty = true
})

impossible.addEventListener("click", function(){
    let impossibleIndex = Math.floor(Math.random() * mythicalCharacters.length)
    botDraw = mythicalCharacters[impossibleIndex]
    choseDifficulty = true
})


//we got 2 values for hp, max and value
//We can set max to the def of the player and bot's character
//It's value will be the same as the max, however we subtract from the max with the bot's attack the moment 
//start game is clicked