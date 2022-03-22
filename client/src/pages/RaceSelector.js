
import React from 'react'
import { useEffect, useState } from 'react'
import { Carousel, Card} from 'react-bootstrap'
import Button from '../styles/Button'
export default function RaceSelector({race, setRace}) {
    const [allRace, setAllRace]=useState([])
    const [raceDescription, setRaceDescription]= useState([])
    const [highlightRace, setHighlightRace]=useState('')
    let raceArr=[]
    let [displayRace, setDisplayRace] = useState(false)
        fetch('https://www.dnd5eapi.co/api/races/')
        .then(r=>r.json())
        .then(a=>setAllRace(a.results))
    let buttonArr=[]
        
    allRace.forEach((r)=>{
        return buttonArr.push(<Button value={r.name} onClick={() => setRace(r.name)}>{r.name}</Button>)
    },
    allRace.forEach((r)=>(
         fetch(`https://www.dnd5eapi.co/api/races/${r.index}`)
            .then(r=> r.json())
            .then(a=>
         setRaceDescription([...raceDescription,
            <Card  key={a.index} name={a.name} >
            <img
             key={a.index}
             className="d-block w-100"
             src={`../public/race_images/${a.index}.png`}
             alt="First slide" />
  
            </Card>])
    ))))
        
return (

<>

{buttonArr}
<p>did this get written</p>
{raceDescription}
</>
  )
}
