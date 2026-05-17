import { useState } from "react"
import { Buttons } from "./Buttons"
import "../index.css"
import { Link } from "react-router-dom";
type Character ={
    name: string;
    Atk: number;
    Def: number;
    img: string;
    id: number;
}
let commonCharacters = [
    {name: "Takemichi Hanagaki", Atk: 10, Def: 10, img: "/characters/Common/Takemichi_Hanagaki.png"},
    {name: "Haruka Sakura", Atk: 10, Def: 10, img: "/characters/Common/Haruka_Sakura.png"},
]

let rareCharacters = [
    {name: "Tanjiro Kamado",  Atk: 60, Def: 50, img: "/characters/Rare/Tanjiro_Kamado.png"},
    {name: "Gabimaru the Hollow", Atk: 30, Def: 40, img: "/characters/Rare/Gabimaru.png"},
    {name: "Yuji Itadori", Atk: 50, Def: 50, img: "/characters/Rare/Yuji_Itadori.png"},
    {name: "Alucard Hellsing", Atk: 40, Def: 40, img: "/characters/Rare/Alucard_Hellsing.png"},
]

let legendaryCharacters = [
    {name: "Izuku Midoriya", Atk: 100, Def: 100, img: "/characters/Legendary/Izuku_Midoriya.png"},
    {name: "Monkey D. Luffy", Atk: 110, Def: 120, img: "/characters/Legendary/Luffy.jpg"},
]

let mythicalCharacters = [
    {name: "Giorno Giovanna", Atk: 80, Def: 999, img: "/characters/Mythical/Giorno.png"},
    {name: "Saitama", Atk: 500, Def: 500, img: "/characters/Mythical/Saitama.png"},
]


type MainProps = {
    characters: Character[]; //turn it into array
    setCharacter: (value: Character[]) => void
}
export function Main({characters, setCharacter}: MainProps){
    const [tempCharacter, setTempCharacter] = useState<Character>({} as  Character)
    const [drawnCharacter, hasDrawnCharacter] = useState(false)
    return(
    
        <div className="flex flex-col gap-3 items-center"> 
            <div className="flex gap-7 my-10 justify-center w-screen items-center"> {/* //header */}
                <Link to="/Storage"><Buttons>STORAGE</Buttons></Link>
                {<Buttons onClick = {() => startGame(setTempCharacter, hasDrawnCharacter)}>START</Buttons>}
                <Buttons>CHARACTER DUELS</Buttons>
            </div> {/* //header closing */}

            <div className="flex gap-4">
                {drawnCharacter === true && <div className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl p-6 halo min-w-96 w-fit min-h-96 h-fit flex flex-col items-center border-2 border-zinc-400/10 rounded-2xl">
                    <div className="flex backdrop-blur-lg rounded-2xl p-3 border-2  border-zinc-400 shadow-2xl ">Name: {tempCharacter.name}</div>
                    <img src = {tempCharacter.img} alt ="character-image" className=" object-contain w-120 h-100"></img> 
                    <div className="flex flex-col backdrop-blur-2xl rounded-2xl p-3 border-2  border-zinc-400/10">
                        <p>Atk: {tempCharacter.Atk}</p>
                        <p>Def: {tempCharacter.Def}</p>
                    </div>
                </div>} {/* character container closing */}
                {characters.length >= 1 && <div className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl py-3 px-10 halo min-w-96 w-fit h-fit flex flex-col border-2 border-zinc-400/10 rounded-2xl">Characters in Storage: {
                    characters.map((character => (
                        <li>{character.name}</li>
                    )))
                } </div>}
            </div>

           {drawnCharacter && <Buttons onClick={() => storeCharacter(tempCharacter, setCharacter, characters)}>STORE</Buttons>}
        </div>

    )
}

function startGame(setTempCharacter: (value: Character) => void, hasDrawnCharacter: (value: boolean) => void){
    let commonIndex = Math.floor(Math.random() * commonCharacters.length)
    let rareIndex = Math.floor(Math.random() * rareCharacters.length)
    let legendaryIndex = Math.floor(Math.random() * legendaryCharacters.length)
    let mythicalIndex = Math.floor(Math.random() * mythicalCharacters.length)
    let characterIndex = Math.floor(Math.random() * 100) + 1;
    let tempCharacter: Character
    if(characterIndex <= 60){
        tempCharacter = {...commonCharacters[commonIndex], id: Date.now()}
        setTempCharacter(tempCharacter)
    } else if(characterIndex > 60 && characterIndex <= 90){
        tempCharacter = {...rareCharacters[rareIndex], id: Date.now()}
        setTempCharacter(tempCharacter)
    } else if(characterIndex > 90 && characterIndex < 100){
        tempCharacter = {...legendaryCharacters[legendaryIndex], id: Date.now()}
        setTempCharacter(tempCharacter)
    } else{
        tempCharacter = {...mythicalCharacters[mythicalIndex], id: Date.now()}
        setTempCharacter(tempCharacter)
    }
    hasDrawnCharacter(true)
    console.log(tempCharacter.img)
}

function storeCharacter(tempCharacter: Character, setCharacter: (value: Character[]) => void, characters: Character[]){
    if(characters.length === 0){
        setCharacter([tempCharacter])
        localStorage.setItem("character-storage", JSON.stringify(tempCharacter)) //saves the character
    } else{
        if(characters.length < 10){
            const characterStorage = [...characters, tempCharacter]
            setCharacter(characterStorage)
            localStorage.setItem("character-storage", JSON.stringify(characterStorage))
        }
    }
}