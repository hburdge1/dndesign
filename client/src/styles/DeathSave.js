import {React, useEffect, useState} from 'react'
import { Button, Box} from '../styles'
import { Alert } from 'react-bootstrap'

export default function DeathSave({player, saved, setSaved, setCurrentHP, history,  currentHP}) {
         const [thisSave, setSave]=useState(true)
         const [color, setColor]=useState('')
         const [saveArr, setSaveArr]=useState([])
         const [bigArr, setBigArr]=useState([])
         const [smallArr, setSmallArr]=useState([])

    useEffect(() => {

        
      return () => {
      <Alert>{saved}</Alert>
      }
    }, [saved])
    
    function rollSave(){
       let num= Math.floor(Math.random() * (20) + 1 )
       setSave(num)
       setSaveArr([...saveArr, num])
       if (num < 10){
        setColor('red');
        setSmallArr([...smallArr, num])
        if (smallArr.length>=2){
        setSaved(false)}
       }
       if (num >=10) {
        setColor('green');
        setBigArr([...bigArr, num])

    if (bigArr.length >=2){
          setSaved(true)}
          setCurrentHP(player.hit_points)
    }
}
    


  return (
    <>
   {saveArr.map(a=>
    <> <span>{a}</span><br/></>)}
    <Button onClick={rollSave}></Button>
    <Box style={{backgroundColor:color}}>{thisSave}</Box>
    </>
  )
} 
