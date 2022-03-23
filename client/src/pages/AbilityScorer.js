
import React from 'react'
import { useState } from 'react';
import { Button, Box } from '../styles'
import Dice from 'react-dice-roll'


export default function AbilityScorer({abScores, setAbScores}) {

    function generateScores(){
        setAbScores({
            'CON': Math.floor(Math.random() * 20),
            'WIS': Math.floor(Math.random() * 20),
            'STR': Math.floor(Math.random() * 20),
            'INT': Math.floor(Math.random() * 20),
            'DEX': Math.floor(Math.random() * 20),
            'CHA': Math.floor(Math.random() * 20)
        }
        )
    }
  return (
    <div className="App">
      <header className="App-header">ABILITY SCORES</header>
      <Box>
            <Box> <span>CON: {abScores["CON"]}</span>  </Box>
            <Box><span>DEX: {abScores["DEX"]}</span>  </Box>
            <Box><span>CHA: {abScores["CHA"]}</span>  </Box>
            <Box><span>INT: {abScores["INT"]}</span>  </Box>
            <Box><span>DEX: {abScores["DEX"]}</span>  </Box>
            <Box><span>STR: {abScores["STR"]}</span>  </Box>
            
        </Box>
        
           <Button onClick={generateScores}> Roll scores</Button>
           
        {/* <button className="button" name='WIS' value='WIS' onClick={rollDice('WIS')}>Roll WIS</button>
        <button className="button" name='CON' value='CON' onClick={rollDice('CON')}>Roll CON</button>
        <button className="button" name='DEX' value='DEX' onClick={rollDice('DEX')}>Roll DEX</button>
        <button className="button" name='STR' value='STR' onClick={rollDice('STR')}>Roll STR</button>
        <button className="button" name='INT' value='INT' onClick={rollDice('INT')}>Roll INT </button>
        <button className="button" name='CHA' value='CHA' onClick={rollDice("CHA")}>Roll CHA</button> */}


    </div>
  );
}


