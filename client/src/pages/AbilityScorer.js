import React from 'react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
export default function AbilityScorer() {
    function  rollAll() {
    this.reactDice.rollAll()
  }
 
   function rollDoneCallback(num) {
    console.log(`You rolled a ${num}`)
  }
  return (
    <div>
        <ReactDice
          numDice={4}
          rollDone={rollDoneCallback}
        />
      </div>
  )
}

