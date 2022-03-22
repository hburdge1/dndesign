
import React from 'react'
import { render } from 'react-dom'
import { useEffect, useState } from 'react'
import { Carousel, Card} from 'react-bootstrap'
import Button from '../styles/Button'
import RaceCard from '../styles/RaceCard'
export default function RaceSelector({race, setRace}) {
    const [allRace, setAllRace]=useState([])
    const [raceDescription, setRaceDescription]= useState([])
    const [highlightRace, setHighlightRace]=useState('')
    let raceArr=[]
    const [relRace, setRelRace]= useState([])
    let result=[]
    useEffect(()=> {
        fetch('https://www.dnd5eapi.co/api/races/')
        .then(r=>r.json())
        .then(a=>setAllRace(a.results))
        }, [])
    console.log(allRace)  
    allRace.forEach((r)=>{
        raceArr.push(r.index)
    })
 let thisNew = raceArr.map((r)=>(
         fetch(`https://www.dnd5eapi.co/api/races/${r}`)
            .then(r=> r.json())
            .then(a=> {
                console.log(
               <RaceCard obj={a}/>)
                
            })))
 return(
    <p>result</p>
 )
}

