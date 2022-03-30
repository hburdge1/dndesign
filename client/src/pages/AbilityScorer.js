
import React from 'react'
import { useState } from 'react';
import { Button, Box } from '../styles'


export default function AbilityScorer({abScores, setAbScores, hitDie, playerClass, abBonuses, allClassDetails, hitPoints, setHitPoints}) {

  allClassDetails.forEach((r)=>{
    if (r.index == playerClass){
      hitDie=r.hit_die
    }
  })
      
    function generateScores(){
        setAbScores({
            'CON': Math.floor(Math.random() * (17 - 8 + 1) + 8 ),
            'WIS': Math.floor(Math.random() * (17 - 8 + 1) + 8 ),
            'STR': Math.floor(Math.random() * (17 - 8 + 1) + 8 ),
            'INT': Math.floor(Math.random() * (17 - 8 + 1) + 8 ),
            'DEX': Math.floor(Math.random() * (17 - 8 + 1) + 8 ),
            'CHA': Math.floor(Math.random() * (17 - 8 + 1) + 8 ),
        })
       setHitPoints(Math.ceil(((Math.random() * hitDie)+ 1) + ((((abScores['CON']) - 10)/2) > 1? (((abScores['CON']) - 10)/2):1)))

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
            <br></br>
            <Box>HP MAX: {hitPoints}</Box>
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


