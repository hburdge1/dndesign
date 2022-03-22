
import React from 'react'
import { useHistory } from 'react-router-dom'
import { render } from 'react-dom'
import { useEffect, useState } from 'react'
import { Carousel, Card, Form} from 'react-bootstrap'
import { Button, FormField, Label, Input } from '../styles'
import RaceCard from '../styles/RaceCard'

export default function RaceSelector({ user }) {
    const [race, setRace] = useState("")
    const [allRace, setAllRace]=useState([])
    const [raceDescription, setRaceDescription]= useState([])
    const [characterName, setCharacterName] = useState("")
    let raceArr=[]
    const [relRace, setRelRace]= useState([])
    let result=[]
   const history = useHistory();
  
  const routeChange = () =>{ 
      
    let path = `/new`; 
    history.push(path);
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       character_race: race,
       character_name: characterName
      }),
    }).then((r) => {
      if (r.ok) {
        history.push("/new");
      } else {
        
      }
    });
  }
 useEffect(()=> {
        fetch('https://www.dnd5eapi.co/api/races/')
        .then(r=>r.json())
        .then(a=>setAllRace(a.results))
        },
    allRace.forEach((r)=>{
        raceArr.push(r.index)
     }),
     raceArr.map((r)=>(
         fetch(`https://www.dnd5eapi.co/api/races/${r}`)
            .then(r=> r.json())
            .then(a=> {
              relRace.push(a)
                
            }))), [])
 return(
   <Carousel variant="dark">
       {relRace.length > 0 ? (relRace.map((r)=> (
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
      <form onSubmit={handleSubmit}>
           <FormField>
            <Label htmlFor="character_name">Title</Label>
            <Input
              type="text"
              id="character_name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            />
          </FormField>
          <FormField>
              <Button onClick={()=>setRace(r.index)}>Choose this race</Button>
          </FormField>
                    <FormField>
            <Button color="primary" type="submit">
             Create this character
            </Button>
          </FormField>
        </form>
    </Carousel.Caption>
  </Carousel.Item>
  ))) : (<p>nothing here</p>)}
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

