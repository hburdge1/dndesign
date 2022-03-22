
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
 raceArr.map((r)=>(
         fetch(`https://www.dnd5eapi.co/api/races/${r}`)
            .then(r=> r.json())
            .then(a=> {
              relRace.push(a)
                
            })))
            console.log(relRace)
 return(
   <Carousel>
       {(relRace.map((r)=> (
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={`/race_images/${r.name}.png`}
    />
    <Carousel.Caption>
      <h3>{r.name}</h3>
      <p>{r.age}</p>
      <br/>
      <p>speed: {r.speed}</p>
      
    </Carousel.Caption>
  </Carousel.Item>
  )))}
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
 )
}

