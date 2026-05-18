import { useEffect, useState } from "react";

type Character ={
    name: string;
    Atk: number;
    Def: number;
    img: string
    id: number | undefined;
}

type DuelProps = {
    characters: Character[]
    commonCharacters: Character[]
    rareCharacters: Character[]
    legendaryCharacters: Character[]
    mythicalCharacters: Character[]
}

export function Duels({characters, commonCharacters, rareCharacters, legendaryCharacters, mythicalCharacters}: DuelProps) {
    const [fighter, setFighter] = useState<Character | null>(JSON.parse(localStorage.getItem("fighter-storage") ?? "null") ?? [])
    const [botFighter, setBotFighter] = useState<Character | null>(JSON.parse(localStorage.getItem("bot-fighter") ?? "null") ?? []) 
    const [chosenState, setChosenState] = useState(false)
    const [chosenDifficulty, setChosenDifficulty] = useState(false)
    const [difficulty, setDifficulty] = useState(0)
    const [isAlive, setisAlive] = useState(JSON.parse(localStorage.getItem("player-state") ?? "false") ?? false)
    const [hasAttacked, setHasAttacked] = useState(false)
    const [botAttacked, setBotAttacked] = useState(false)
    const [buttonCooldown, setButtonCooldown] = useState(false)
    const [initialPlayerDef, setinitialPlayerDef] = useState(fighter?.Def)
    const [initialBotDef, setinitialBotDef] = useState(botFighter?.Def)
    
    useEffect(() => {
        if(isAlive === false){
            setFighter(null)
            setBotFighter(null)
            setChosenState(false)
            setDifficulty(0)
            
        }
    }, [isAlive])

    useEffect(() => {
        if(fighter !==  null){
            if(fighter!.Def < 0){
                alert("You lost!")
                setFighter(null)
                setBotFighter(null)
                setChosenState(false)
                setChosenDifficulty(false)
                setDifficulty(0)
                localStorage.setItem("player-state", JSON.stringify(false))
                setisAlive(false)
            }
        }
    }, [fighter])


    useEffect(() => {
        if(botFighter !== null){
            if(botFighter!.Def <= 0){
                alert("You won!")
                setFighter(null)
                setBotFighter(null)
                setChosenState(false)
                setChosenDifficulty(false)
                setDifficulty(0)
                localStorage.setItem("player-state", JSON.stringify(false))
                setisAlive(false)
            }
        }
    }, [botFighter])

    useEffect(() => {
        if(hasAttacked === true){ //if the player has attacked
            setBotAttacked(false)
        } else if(botAttacked === true){ // if the bot has attacked
            setHasAttacked(false)
        }
    }, [hasAttacked, botAttacked])

    return(
        <div id ="body" className="bg-[url('/Background/Duels.jpg')] w-screen h-screen bg-no-repeat bg-center bg-cover bg-fixed flex items-center">
            <div id = "player-actions" className="flex flex-col px-6 items-center">
                {botAttacked === true && <h1 className="flex-1 w-full h-full text-center text-2xl font-bold ">Bot Attacks! - {botFighter?.Atk} Hp</h1>}
                <div id = "chosen-character-container" className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl px-3 py-6 halo min-w-170 w-fit min-h-140 my-2 h-fit flex flex-col gap-2 items-center border-2 border-zinc-400/10 rounded-2xl">
                    {(chosenState === true || isAlive === true) && <progress max = {initialPlayerDef} value = {fighter?.Def} className="rounded-lg bg-red-400">HP: {fighter?.Def}</progress>}
                    {(chosenState === false && isAlive === false) && <h1 className="flex items-center justify-center text-center w-full h-full text-zinc-50 text-3xl">You haven't added a character yet! Add one to get started</h1>}
                    {(chosenState === true || isAlive === true) && <img src = {fighter!.img} alt = "image of character" className="w-80 h-100"></img>}
                    {(chosenState === true || isAlive === true) && <div id = "fighter-stats" className="flex backdrop-blur-lg rounded-2xl border-2 flex-col gap-1 border-zinc-400 shadow-2xl w-fit px-6 py-2 font-bold text-center justify-center">
                        <p>Atk: {fighter?.Atk}</p>
                        <p>Def: {fighter?.Def}</p>
                    </div>}
                </div>
                {isAlive === false && <div id = "choose-characters-here" className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl px-3 py-6 halo w-170 min-h-50 h-fit flex gap-2 items-center border-2 border-zinc-400/10 rounded-2xl flex-wrap">
                {characters.length > 0 && characters.map((character) =>(
                        <button onClick = {() => {setFighter(character), setChosenState(true), localStorage.setItem('fighter-storage', JSON.stringify(character))}}className="flex-1 grow hover:brightness-90 outline-2 outline-zinc-50 hover:p-4 hover:cursor-pointer min-w-26 hover:scale-105 transition-all bg-red-600/80 p-3 rounded-lg">{character.name}</button>
                ))}
                </div>}
            </div>

            <div id = "center" className="flex flex-col gap-3">
                <div className="flex backdrop-blur-lg rounded-2xl border-2 flex-col gap-1 border-zinc-400 shadow-2xl w-fit px-6 py-2 font-bold text-center justify-center">
                    <p>Wins: </p>
                    <p>Losses: </p>
                </div>
               {(chosenState === true && chosenDifficulty === true && isAlive === false) && <button onClick = {() => startGame(difficulty, botFighter!, setBotFighter)}className="flex bg-green-400 rounded-2xl border-2 flex-col gap-1 border-zinc-400 shadow-2xl w-fit px-6 py-3 h-fit text-center justify-center hover:cursor-pointer hover:bg-green-500 hover:px-7 hover:py-4 hover:scale-105 transition-all">START</button>}
               {(isAlive === true && <button  disabled = {buttonCooldown} onClick = {() => Fight(fighter!, botFighter!)}className="flex bg-red-700 rounded-2xl border-2 flex-col gap-1 border-zinc-400 shadow-2xl w-fit px-6 py-3 h-fit text-center justify-center hover:cursor-pointer hover:brightness-75 hover:px-7 hover:py-4 hover:scale-105 transition-all">ATTACK</button>)}
            </div>

            <div id = "bot-actions-and-difficulty" className="flex flex-col gap-2 items-center">
                {hasAttacked === true && <h1 className="flex-1 w-full h-full text-center text-2xl font-bold ">Player attacked! -{fighter?.Atk} Hp!</h1>}
                <div id = "bot-character-container" className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl px-3 py-6 halo min-w-165 w-fit min-h-170 mx-5 h-fit flex flex-col gap-2 items-center border-2 border-zinc-400/10 rounded-2xl">
                    {(chosenDifficulty === false && isAlive === false) && <h1 className="flex items-center justify-center text-center w-full h-full text-zinc-50 text-3xl">Choose a difficulty first!</h1>}
                    {(chosenDifficulty === true && isAlive === false) && <h1 className="flex items-center justify-center text-center w-full h-full text-zinc-50 text-3xl">Click Start Game!</h1>}
                    {(chosenDifficulty === true && isAlive === true) && <progress max = {initialBotDef} value = {botFighter?.Def}>HP:</progress>}
                    {(chosenDifficulty === true && isAlive === true) && <img alt = "Character image" src = {botFighter?.img} className="flex w-full h-140"></img>}
                    {(chosenDifficulty === true && isAlive === true) && <div id = "bot-stats" className="flex backdrop-blur-lg rounded-2xl border-2 flex-col gap-1 border-zinc-400 shadow-2xl w-fit px-6 py-2 font-bold text-center justify-center">
                        <p>Atk: {botFighter?.Atk} </p>
                        <p>Def: {botFighter?.Def} </p>
                        </div>}
                </div>
                {isAlive === false && <div id = "difficulties" className="w-165 h-fit gap-3 flex justify-evenly">
                    <button onClick = {() => {setDifficulty(1), setChosenDifficulty(true)}} className="flex-1 mx-5 rounded-lg hover: cursor-pointer py-3 px-10 text-center bg-green-500 hover:bg-green-600 hover:scale-105 outline-2 outline-zinc-50 hover:shadow-2xl hover:px-7 hover:py-4 transition-all h-fit w-fit">EASY</button>
                    <button onClick = {() => {setDifficulty(2), setChosenDifficulty(true)}} className="flex-1 mx-5 rounded-lg hover: cursor-pointer py-3 px-6 bg-orange-400 hover:brightness-90 hover:scale-105 outline-2 outline-zinc-50 hover:shadow-2xl hover:px-7 hover:py-4 transition-all h-fit w-fit">MEDIUM</button>
                    <button onClick = {() => {setDifficulty(3), setChosenDifficulty(true)}}  className="flex-1 mx-5 rounded-lg hover: cursor-pointer py-3 px-6 bg-red-400 hover:brightness-90 hover:scale-105 outline-2 outline-zinc-50 hover:shadow-2xl hover:px-7 hover:py-4 transition-all h-fit w-fit">HARD</button>
                    <button onClick = {() => {setDifficulty(4), setChosenDifficulty(true)}}  className="flex-1 mx-5 rounded-lg hover: cursor-pointer py-3 px-6 bg-purple-500 hover:brightness-90 hover:scale-105 outline-2 outline-zinc-50 hover:shadow-2xl hover:px-7 hover:py-4 transition-all h-fit w-fit">IMPOSSIBLE</button>
                </div>}
            </div>
    

        </div>
    )

    function startGame(difficulty: number, botFighter: Character, setBotFighter: (value: Character) => void){
        const commonIndex = Math.floor(Math.random() * commonCharacters.length) 
        const rareIndex = Math.floor(Math.random() * rareCharacters.length)
        const legendaryIndex = Math.floor(Math.random() * legendaryCharacters.length)
        const mythicalIndex = Math.floor(Math.random() * mythicalCharacters.length)
        let tempBotFighter = botFighter
        let tempState = true
        if(difficulty === 1){
            tempBotFighter = commonCharacters[commonIndex]
            setBotFighter(tempBotFighter)
            localStorage.setItem("bot-fighter", JSON.stringify(tempBotFighter))
        } else if(difficulty === 2){
            tempBotFighter = rareCharacters[rareIndex]
            setBotFighter(tempBotFighter)
            localStorage.setItem("bot-fighter", JSON.stringify(tempBotFighter))
        } else if(difficulty === 3){
            tempBotFighter = legendaryCharacters[legendaryIndex]
            setBotFighter(tempBotFighter)
            localStorage.setItem("bot-fighter", JSON.stringify(tempBotFighter))
        } else if(difficulty === 4){
            tempBotFighter = mythicalCharacters[mythicalIndex]
            setBotFighter(tempBotFighter)
            localStorage.setItem("bot-fighter", JSON.stringify(tempBotFighter))
        } else{

        }
        setisAlive(tempState)
        localStorage.setItem("player-state", JSON.stringify(tempState))

    }

    function Fight(fighter: Character, botFighter: Character){
        setButtonCooldown(true)
        setTimeout(() => {
            setButtonCooldown(false)
        }, 3000);
        setBotFighter({...botFighter, Def: botFighter.Def - fighter.Atk})
        setHasAttacked(true)
        setBotAttacked(false)
        setTimeout(() => {
            setFighter({...fighter, Def: fighter.Def - botFighter.Atk})
            setBotAttacked(true)
            setHasAttacked(false)
        }, 1000);

        
    }
}