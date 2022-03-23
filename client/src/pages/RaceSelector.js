
import React from 'react'
import { useHistory } from 'react-router-dom'
import { render } from 'react-dom'
import { useEffect, useState } from 'react'
import { Carousel, Card, Form} from 'react-bootstrap'
import { Button, FormField, Label, Input } from '../styles'
import RaceCard from '../styles/RaceCard'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function RaceSelector({ user, characterName, setCharacterName, setToggle, toggle, race, setRace, abScores, setAbScores }) {
    const [allRace, setAllRace]=useState([])
    const [raceDescription, setRaceDescription]= useState([])
    let raceArr=[]
    const [relRace, setRelRace]= useState([])
    let result=[]
   const history = useHistory();
  
   const handleRaceClick = (e) =>{
        setRace(e.target.value)
        e.ability_bonuses.forEach((s)=> {{setAbScores({...abScores[s.ability_score.name]=abScores[s.ability_score.name] + s.bonus})}})
        setToggle(!toggle)
   }
//   const routeChange = () =>{ 
      
//     let path = `/new`; 
//     history.push(path);
//   }
  function handleSubmit(e) {
    e.preventDefault();
    setCharacterName(e.target.value)
    e.reset()

  }
//     fetch("/players", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//        user_id: user.id,
//        character_race: race,
//        character_name: characterName
//       }),
//     }).then((r) => {
//       if (r.ok) {
//         history.push("/new");
//       } else {
        
//       }
//     });
//     e.reset()
//   }
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
      <Popup trigger={<button>learn more</button>}  position="right-center">
        {(r.ability_bonuses.map((s)=>
        <span>{s.ability_score.name}: {s.bonus}</span>))}
      <form onSubmit={handleSubmit}>
           <FormField>
            <Label htmlFor="character_name">Name your character</Label>
            <Input
              type="text"
              id="character_name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            />
          </FormField>
          <FormField>
              <Button value={r.index} onClick={handleRaceClick}>Choose this race</Button>
          </FormField>
                    <FormField>
            {/* <Button color="primary" type="submit">
             Create this character
            </Button> */}
          </FormField>
        </form>
          </Popup>
    </Carousel.Caption>
  </Carousel.Item>
  ))) : (<p>nothing here</p>)}
</Carousel>
 )
}

