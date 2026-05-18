import { useState } from "react"
import { Main } from "./assets/Main"
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Storage } from "./Pages/Storage";
import { Duels } from "./Pages/Duels";


type Character ={
  name: string;
  Atk: number;
  Def: number;
  img: string;
  id: number | undefined;
}
let commonCharacters: Character[] = [
    {name: "Takemichi Hanagaki", Atk: 10, Def: 10, img: "/characters/Common/Takemichi_Hanagaki.png", id: undefined},
    {name: "Haruka Sakura", Atk: 10, Def: 10, img: "/characters/Common/Haruka_Sakura.png", id: undefined},
]

let rareCharacters: Character[] = [
    {name: "Tanjiro Kamado",  Atk: 60, Def: 50, img: "/characters/Rare/Tanjiro_Kamado.png", id: undefined},
    {name: "Gabimaru the Hollow", Atk: 30, Def: 40, img: "/characters/Rare/Gabimaru.png", id: undefined},
    {name: "Yuji Itadori", Atk: 50, Def: 50, img: "/characters/Rare/Yuji_Itadori.png", id: undefined},
    {name: "Alucard Hellsing", Atk: 40, Def: 40, img: "/characters/Rare/Alucard_Hellsing.png", id: undefined},
]

let legendaryCharacters: Character[] = [
    {name: "Izuku Midoriya", Atk: 100, Def: 100, img: "/characters/Legendary/Izuku_Midoriya.png", id: undefined},
    {name: "Monkey D. Luffy", Atk: 110, Def: 120, img: "/characters/Legendary/Luffy.jpg", id: undefined},
]

let mythicalCharacters: Character[] = [
    {name: "Giorno Giovanna", Atk: 80, Def: 999, img: "/characters/Mythical/Giorno.png", id: undefined},
    {name: "Saitama", Atk: 500, Def: 500, img: "/characters/Mythical/Saitama.png", id: undefined},
]


export default function App(){ 
  const[characters, setCharacter] = useState<Character[]>(JSON.parse(localStorage.getItem("character-storage") ?? "null") ?? [])
  return(
  <BrowserRouter>
  <Routes>
    <Route path = "/" element = {
      <Main
        characters = {characters}
        setCharacter = {setCharacter}
        commonCharacters = {commonCharacters}
        rareCharacters = {rareCharacters}
        legendaryCharacters = {legendaryCharacters}
        mythicalCharacters = {mythicalCharacters}
      />
    }></Route>

    <Route path = "/Storage" element = {
      <Storage
      characters = {characters}
      setCharacter = {setCharacter}
      />
    }></Route>

    <Route path = "/Duels" element = {
      <Duels
        characters = {characters}
        commonCharacters = {commonCharacters}
        rareCharacters = {rareCharacters}
        legendaryCharacters = {legendaryCharacters}
        mythicalCharacters = {mythicalCharacters}
      />
    }></Route>

  </Routes>
  </BrowserRouter>)
}


