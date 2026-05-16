import { useState } from "react"
import { Main } from "./assets/Main"


type Character ={
  name: string;
  Atk: number;
  Def: number;
  img: string;
}
export default function App(){ 
  const[characters, setCharacter] = useState<Character[]>(JSON.parse(localStorage.getItem("character-storage") ?? "null") ?? [])
  return(
      <Main
      characters = {characters}
      setCharacter = {setCharacter}
      />
  )
}


