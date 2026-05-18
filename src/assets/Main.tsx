import { useState } from "react"
import { Buttons } from "./Buttons"
import "../index.css"
import { Link } from "react-router-dom";
import { motion } from "motion/react"
type Character ={
    name: string;
    Atk: number;
    Def: number;
    img: string;
    id: number | undefined;
}


type MainProps = {
    characters: Character[]; 
    setCharacter: (value: Character[]) => void;
    commonCharacters: Character[];
    rareCharacters: Character[];
    legendaryCharacters: Character[];
    mythicalCharacters: Character[];
}
export function Main({characters, setCharacter, commonCharacters, rareCharacters, legendaryCharacters, mythicalCharacters}: MainProps){
    const [tempCharacter, setTempCharacter] = useState<Character>({} as  Character)
    const [drawnCharacter, hasDrawnCharacter] = useState(false)
    return(
    
        <div className="flex flex-col gap-3 items-center"> 
            <div className="flex gap-7 my-10 justify-center w-screen items-center"> 
                <Link to="/Storage"><Buttons>STORAGE</Buttons></Link>
                {<Buttons onClick = {() => startGame(setTempCharacter, hasDrawnCharacter, commonCharacters, rareCharacters, legendaryCharacters, mythicalCharacters)}>START</Buttons>}
                <Link to="/Duels"><Buttons>CHARACTER DUELS</Buttons></Link>
            </div> {/* //header closing */}

            <div className="flex gap-4">
                {drawnCharacter === true && <div className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl p-6 halo min-w-96 w-fit min-h-96 h-fit flex flex-col items-center border-2 border-zinc-400/10 rounded-2xl">
                    <div className="flex backdrop-blur-lg rounded-2xl p-3 border-2  border-zinc-400 shadow-2xl ">Name: {tempCharacter.name}</div>
                    <motion.img src = {tempCharacter.img} alt ="character-image" className=" object-contain w-120 h-100"
                    key = {tempCharacter.id || tempCharacter.img}
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        opacity: { duration: 0.2 } 
                    }}
                    ></motion.img> 
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

function startGame(setTempCharacter: (value: Character) => void, hasDrawnCharacter: (value: boolean) => void, commonCharacters: Character[], rareCharacters: Character[], legendaryCharacters: Character[], mythicalCharacters: Character[]){
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
}

function storeCharacter(tempCharacter: Character, setCharacter: (value: Character[]) => void, characters: Character[]){
    if(characters.length === 0){
        setCharacter([tempCharacter])
        localStorage.setItem("character-storage", JSON.stringify(tempCharacter))
    } else{
        if(characters.length < 10){
            const characterStorage = [...characters, tempCharacter]
            setCharacter(characterStorage)
            localStorage.setItem("character-storage", JSON.stringify(characterStorage))
        }
    }
}