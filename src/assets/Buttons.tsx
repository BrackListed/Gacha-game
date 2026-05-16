import type { ReactNode } from "react";
import { motion } from "motion/react"

type ButtonProp = {
    children: ReactNode
    onClick?: () => void
}

export function Buttons({children, onClick}: ButtonProp) {
    
    return(
        <motion.button onClick = {onClick} className="text-zinc-50 border-2 border-zinc-50 bg-transparent hover:backdrop-blur-xs w-52 py-5 px-7 rounded-lg hover:cursor-pointer"
        whileHover={{
            scale: 1.15,
            boxShadow: "0px 0px 8px rgb(255, 255, 255)",
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
        }}
        
        >{children}</motion.button>
    )
}