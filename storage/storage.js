let imageContainers = document.querySelectorAll(".character")
let storedCharacters = JSON.parse(localStorage.getItem("stored-characters")) || []
// let characterImg = document.createElement("img")
// characterImg.src = "../" + characterRetrieval.img
// imageContainers[0].appendChild(characterImg)
// reference on how we're going to proceed from here
//how we're going with this is we make a foreach loop that goes thru my localstorage of stored characters, and attach each one to individual containers
//image containers[0] will also go thru with this array, so everytime the [0] will get +1

storedCharacters.forEach((characters, index) => {
    let characterImg = document.createElement("img")
    characterImg.src = "../" + characters.img
    let dictateLength = 0
    console.log(characters)
    console.log(index)
    dictateLength += index
    imageContainers[dictateLength].appendChild(characterImg)
    });

//loops thru storedCharacters array, attaching their image, and basing [0] off of its lenght(maybe)
//say u got 2 cahracters, izuku and luffy, u want them both in 2 different image containers, characters will loop thru every character anyway, so maybe
// 0 + 1?? make it start 0, fk maybe let's just do a foreach based on the length of characters, that way it'll increase exactly with the length of the characters
