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
        <div id ="body" className="bg-[url('/Background/Duels.jpg')] w-screen h-screen bg-no-repeat bg-center bg-cover bg-fixed flex flex-col items-center"></div>
    )
}