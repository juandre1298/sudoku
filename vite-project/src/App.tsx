import './App.css'
import useSudoku from './hooks/useSudoku'
function App() {
  const { loading, game, error } = useSudoku();
  if(loading)<div>'loading...'</div>
  return (
    <>
      {game.length > 0 ? <div>{game.map(row=>(
        row.map( cell => (<div>{cell.default}</div>))
      ))}</div>  : <h1>not found</h1>}
    </>
  )
}

export default App
