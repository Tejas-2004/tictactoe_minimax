import { useState } from 'react';
import './Grid.css';
import checkWinner from './checkWinner';
import axios from 'axios';


function Grid() {

    const [gridSize,setGridSize]=useState(3);
    const [board, setBoard] = useState(new Array(gridSize ** 2).fill(-1));
    const [player, setPlayer] = useState("X");

    const playerValue = player==="X" ? 1 : 0
    const styleSize=60*gridSize;

    const check = checkWinner(board,gridSize);
    
    const markSymbol = (index)=>{
        if(!check && player==="X"){
            if(board[index]===-1) board[index]=playerValue
            setBoard(board);
            // setPlayer(player === "X" ? "O" : "X");
            setPlayer("O")
        }

        if(!check && player=="O"){
            axios.post('http://127.0.0.1:5000/send-data', {board})
            .then(response => {
                // console.log('Received response from backend:', response.data);
                const AI_position =  response.data.pos
                // markSymbol(AI_position)
                if(board[AI_position]===-1) board[AI_position]=playerValue
                setBoard(board);
                // setPlayer(player === "X" ? "O" : "X");
                setPlayer("X")
            })
            .catch(error => {
                console.error('There was a problem with the Axios request:', error);
            });
        }




    }
    
if(player==="O") markSymbol(-1)


    const dropDownHandler = (event)=>{
        setGridSize(parseInt(event.target.value, 10));
        resetBoard(parseInt(event.target.value, 10));
    }

    const resetBoard = (size = gridSize) => {
        setBoard(new Array(size ** 2).fill(-1));
        setPlayer("X");
    }

    return (
        <div className='MainContainer'>
            <div>
                { check==="X" && <div style={{color:"green",fontSize:"xx-large",fontWeight:"600",marginBottom:"0rem"}}>Winner is player X</div>}
                { check==="O" && <div style={{color:"red",fontSize:"xx-large",fontWeight:"600",marginBottom:"0rem"}}>Winner is player O</div> }
                {!(new Set(board)).has(-1) && <div style={{color:"white",fontSize:"xx-large",fontWeight:"600",marginBottom:"1rem"}}>Tie Game</div> }
            </div>
           { !check && (new Set(board)).has(-1) && (<div className='Player' style={player==="X" ? {color:"green"} : {color:"red"}}>
                            Player : {player}
                        </div>) }
            <div style={{width:styleSize,height:styleSize}} className="GridContainer">
                {board.map((grid, index) => {
                    return (
                        <div key={index} className="Grid" onClick={()=>markSymbol(index)}>
                            {grid===1 && <span style={{color:"green",fontSize:"xx-large",fontWeight:"700"}}>X</span> }
                            {grid===0 && <span style={{color:"red",fontSize:"xx-large",fontWeight:"700"}}>O</span> }
                        </div>
                    );
                })}
            </div>
            <div>
                <button style={{margin:"2.5em"}} onClick={()=>resetBoard(gridSize)}>Reset</button>
            </div>


            <div>
                <label>Choose Board Size </label>
                <select value={gridSize} onChange={dropDownHandler}>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                </select>
            </div>




        </div>
    );
}

export default Grid;
