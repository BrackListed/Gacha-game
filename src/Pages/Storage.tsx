type Character = {
    name: string;
    Atk: number;
    Def: number;
    img: string;
}

type StorageProps = {
    characters: Character[]
    setCharacter: (value: Character[]) => void
}


export function Storage({characters, setCharacter}: StorageProps) {
    console.log(characters)
    return(
        <div id = "body" className="bg-[url('/Background/Storage.jpg')] w-screen h-screen bg-no-repeat bg-center bg-cover bg-fixed flex flex-col items-center">
        <div id = "Storage-container" className="bg-slate-800 border-zinc-800 border-4 w-7xl flex min-h-180 my-10 px-5 py-3">
            {characters.length === 0 && <h1 className="w-full h-full flex justify-center items-center text-4xl">No Characters to display. Store one to get started!</h1>}
            <div className="flex flex-wrap gap-3">
                {characters && characters.map((character) => (
                    <div className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl p-6 halo min-w-52 w-fit min-h-48 h-fit flex flex-col items-center border-2 border-zinc-400/10 rounded-2xl">
                        <div className="flex backdrop-blur-lg rounded-2xl p-3 border-2  border-zinc-400 shadow-2xl w-46">{character.name}</div> 
                        <img src = {character.img} alt = "image of character" className="object-contain h-42"></img>
                        <div id = "Stats">
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