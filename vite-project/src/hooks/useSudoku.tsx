import { useState, useEffect } from "react";
import type { CellI } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const useSudoku = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const [game, setGame] = useState<CellI[][]>([]);
    const [error, setError] = useState('');

    useEffect(()=>{
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY
            }
        }
        const getSudoku = async ()=>{
            try{
                const ans = await fetch(API_URL, options)
                const data = await ans.json()
                const seedGame = data.solution.map((row:CellI[], i:number) =>(row.map((cell:CellI, j:number) =>{
                    console.log(data.puzzle[i][j])
                    return {
                        answer: cell,
                        default: data.puzzle[i][j],
                        set: data.puzzle[i][j],
                        status: null,
                        coordinateI: i,
                        coordinateJ: j,
                        sector: [Math.trunc(i/3),Math.trunc(j/3)]
                    }
                })))
                setGame(seedGame)
            }catch(e){
                console.error(e)
            }finally{
                setLoading(false)
            }

        }


        getSudoku();
    },[])


    const updateCell = (i:number,j:number,cell:CellI)=>{
        const currentGame = [...game]
        currentGame[i][j] = cell
        setGame(currentGame)
    }
    return {loading, game, error, updateCell, setGame}
} 

export default useSudoku;