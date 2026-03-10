import './App.css'
import useSudoku from './hooks/useSudoku'
import { useState } from 'react';
import type { CellI, cellStatus } from './types/types';

function App() {
  const { loading, game, error, updateCell, setGame } = useSudoku();
  const [ selectedCell, setSelectedCell ] = useState<CellI>(); 

  if(loading)<div>'loading...'</div>
  if(error)<div>"Something went wrong, contect support :("</div>

  const setStatus = (i:number, j:number, colIndex:number, rowIndex:number) => {
    if(rowIndex === i && colIndex === j ){
      return 'target'
    }
    if(rowIndex === i || colIndex === j ){
      return 'focus'; 
    }
    if(String(game[rowIndex][colIndex].sector)==String(game[i][j].sector) ){
      return 'focus'; 
    }

    return null
  } 
  
  const handleSelect = (i: number, j: number) => {
    if (game[i][j].default) return;

    const nextGame = game.map((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        ...cell,
        status: setStatus(i, j, colIndex, rowIndex) as cellStatus,
      }))
    );
    setGame(nextGame);
    setSelectedCell(game[i][j])
  };

  

  const handleSetValue = (e: { target: { value: string; }; }) =>{
    if(!selectedCell) return;
    const newVal = parseInt(e.target.value);

    if(newVal > 9 || newVal < 0 || isNaN(newVal)){
      alert('invalid value')
      return;
    }

    const i = selectedCell.coordinateI;
    const j = selectedCell.coordinateJ;
  
    // check row
    const row = game[i].map(c => c.set);
    if(row.includes(newVal)){
      alert('no! row')
      return 
    }
    // check col
    const col = game.map(r => r[j].set);
    if(col.includes(newVal)){
      alert('no! col')
      return 
    }
    // check cuadrant
    const selectedSector = String(game[i][j].sector);
    const sector = game.flat().filter(cell => String(cell.sector) == selectedSector).map(c => c.set);
    console.log(sector, selectedSector)
    if(sector.includes(newVal)){
      alert('no! sector')
      return 
    }    
    // update value
    const newCell = game[i][j]
    newCell.set = newVal
    updateCell(i,j,newCell)

    // check if won
    if(!game.flat().map(c => c.set).includes(null)){
      alert('you won!') 
    }
  }


  return (
    <>
      {game.length > 0 ? <table>
        <tbody>
          {game.map((row, i)=>(
            <tr key={`row-${i}`}className={`grid grid-cols-9 ${i%3 == 0 ? 'border-t-3' : ''}`}>
              {row.map( (cell, j) => (
                <td 
                  id={`[${i},${j}]`} 
                  key={`[${i},${j}]`} 
                  className={`w-[50px] h-[50px] border flex justify-center items-center ${j%3 == 0 ? 'border-l' : ''} 
                  ${cell.status === 'target' ? 'bg-yellow-600' : ''}
                  ${cell.status === 'focus' ? 'bg-yellow-900' : ''}
                  `} 
                  onClick={()=>handleSelect(i,j)}>
                  { !cell.default && cell.status === 'target'  ? (
                    <input className='w-full h-full flex justify-center items-center text-center' autoFocus onChange={handleSetValue}/>
                  ) : (
                  <>{cell.set}</>
                  )}
                </td>))}
          </tr>
        ))}
        </tbody>
      </table>  : <h1>not found</h1>}
    </>
  )
}

export default App
