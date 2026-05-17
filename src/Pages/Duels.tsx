type Character ={
    name: string;
    Atk: number;
    Def: number;
    id: number;
}

type DuelProps = {
    characters: Character[]
}

export function Duels({characters}: DuelProps) {
    return(
        <div id ="body" className="bg-[url('/Background/Duels.jpg')] w-screen h-screen bg-no-repeat bg-center bg-cover bg-fixed flex items-center">
            <div id = "player-actions" className="flex flex-col px-6">
                <div id = "chosen-character-container" className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl px-3 py-6 halo min-w-170 w-fit min-h-140 my-2 h-fit flex flex-col gap-2 items-center border-2 border-zinc-400/10 rounded-2xl"></div>
                <div id = "choose-characters-here" className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl px-3 py-6 halo w-170 min-h-50 h-fit flex gap-2 items-center border-2 border-zinc-400/10 rounded-2xl flex-wrap">
                {characters.map((character) =>(
                        <button className="flex-1 grow hover:brightness-90 outline-2 outline-zinc-50 hover:p-4 hover:cursor-pointer min-w-26 hover:scale-105 transition-all bg-red-600/80 p-3 rounded-lg">{character.name}</button>
                ))}
                </div>
            </div>

            <div id = "center" className="flex flex-col gap-3">
                <div className="flex backdrop-blur-lg rounded-2xl border-2 flex-col gap-1 border-zinc-400 shadow-2xl w-fit px-6 py-2 font-bold text-center justify-center">
                    <p>Wins: </p>
                    <p>Losses: </p>
                </div>
                <button className="flex bg-green-400 rounded-2xl border-2 flex-col gap-1 border-zinc-400 shadow-2xl w-fit px-6 py-3 h-fit text-center justify-center hover:cursor-pointer hover:bg-green-500 hover:px-7 hover:py-4 hover:scale-105 transition-all">START</button>
            </div>

            <div id = "bot-actions-and-difficulty" className="flex flex-col gap-2">
                <div id = "bot-character-container" className=" ring-black/10 ring-1 bg-white/10 backdrop-blur-sm shadow-2xl px-3 py-6 halo min-w-165 w-fit min-h-170 mx-5 h-fit flex flex-col gap-2 items-center border-2 border-zinc-400/10 rounded-2xl"></div>
                <div id = "difficulties" className="w-165 h-fit gap-3 flex justify-evenly">
                    <button className="flex-1 mx-5 rounded-lg hover: cursor-pointer py-3 px-10 text-center bg-green-500 hover:bg-green-600 hover:scale-105 outline-2 outline-zinc-50 hover:shadow-2xl hover:px-7 hover:py-4 transition-all h-fit w-fit">EASY</button>
                    <button className="flex-1 mx-5 rounded-lg hover: cursor-pointer py-3 px-6 bg-orange-400 hover:brightness-90 hover:scale-105 outline-2 outline-zinc-50 hover:shadow-2xl hover:px-7 hover:py-4 transition-all h-fit w-fit">MEDIUM</button>
                    <button className="flex-1 mx-5 rounded-lg hover: cursor-pointer py-3 px-6 bg-red-400 hover:brightness-90 hover:scale-105 outline-2 outline-zinc-50 hover:shadow-2xl hover:px-7 hover:py-4 transition-all h-fit w-fit">HARD</button>
                    <button className="flex-1 mx-5 rounded-lg hover: cursor-pointer py-3 px-6 bg-purple-500 hover:brightness-90 hover:scale-105 outline-2 outline-zinc-50 hover:shadow-2xl hover:px-7 hover:py-4 transition-all h-fit w-fit">IMPOSSIBLE</button>
                </div>
            </div>
    

        </div>
    )
}