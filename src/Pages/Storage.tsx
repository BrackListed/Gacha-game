type Character = {
    name: string;
    Atk: number;
    Def: number;
    img: string;
    id: number;
}

type StorageProps = {
    characters: Character[]
    setCharacter: (value: Character[]) => void
}


export function Storage({characters, setCharacter}: StorageProps) {
    console.log(characters)
    return(
        <div id = "body" className="bg-[url('/Background/Storage.jpg')] w-screen h-screen bg-no-repeat bg-center bg-cover bg-fixed flex flex-col items-center">
        <div id = "Storage-container" className="bg-slate-800 border-zinc-800 border-4 w-380 flex min-h-fit my-3 rounded-lg px-5 py-3">
            {characters.length === 0 && <h1 className="w-full h-full flex justify-center items-center text-4xl">No Characters to display. Store one to get started!</h1>}
            <div className="flex flex-wrap gap-3">
                {characters && characters.map((character) => (
                    <div className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl px-3 py-6 halo min-w-52 w-fit min-h-96 h-fit flex flex-col gap-2 items-center border-2 border-zinc-400/10 rounded-2xl">
                        <div className="flex gap-2 w-full">
                            <div className="flex backdrop-blur-lg rounded-2xl p-3 border-2 border-zinc-400 shadow-2xl w-50 text-center justify-center">{character.name}</div> 
                            <button onClick = {() => removeCharacter(character.id, characters, setCharacter)}className="flex bg-red-600 border-2 border-zinc-900 text-zinc-900 h-fit p-2 text-2xl hover:cursor-pointer transition-all hover:scale-105 hover:bg-red-800">×</button>
                        </div>
                        <img src = {character.img} alt = "image of character" className="object-contain h-42"></img>
                        <div id = "Stats" className="flex backdrop-blur-lg rounded-2xl border-2 flex-col gap-1 border-zinc-400 shadow-2xl w-42 text-center justify-center">
                            <p>Atk: {character.Atk}</p>
                            <p>Def: {character.Def}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}

function removeCharacter(id: number, characters: Character[], setCharacter: (value: Character[]) => void){
    const removedCharacter = characters.filter(removeCharacter => removeCharacter.id != id)
    setCharacter(removedCharacter)
}