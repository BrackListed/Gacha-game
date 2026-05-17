import { useState } from "react"
import { Main } from "./assets/Main"
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Storage } from "./Pages/Storage";


type Character ={
  name: string;
  Atk: number;
  Def: number;
  img: string;
}

export default function App(){ 
  const[characters, setCharacter] = useState<Character[]>(JSON.parse(localStorage.getItem("character-storage") ?? "null") ?? [])
  return(
  <BrowserRouter>
  <Routes>
    <Route path = "/" element = {
      <Main
        characters = {characters}
        setCharacter = {setCharacter}
      />
    }></Route>
    <Route path = "/Storage" element = {
      <Storage/>
    }></Route>
  </Routes>
  </BrowserRouter>)
}


