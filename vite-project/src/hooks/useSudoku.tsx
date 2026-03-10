import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
interface Cell {
    answer: number;
    default: number;
    active: boolean;
    set: number;
}
const useSudoku = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const [game, setGame] = useState<Cell[][]>([]);
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
                const seedGame = data.solution.map((row:Cell[], i:number) =>(row.map((cell:Cell, j:number) =>{
                    return {
                        answer: cell,
                        default: data.puzzle[i][j],
                        set: data.puzzle[i][j],
                        active: false
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
    return {loading, game, error}
} 

export default useSudoku;