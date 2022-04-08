
import React from 'react'
import { useHistory } from 'react-router-dom'
import { render } from 'react-dom'
import { useEffect, useState } from 'react'
import { Carousel, Card, Form} from 'react-bootstrap'
import { Button, FormField, Label, Input } from '../styles'

import {Grid, Container, Col, Row, Alert, Modal} from 'react-bootstrap'


export default function RaceSelector({ user, characterName, setCharacterName, abBonuses, setAbBonuses, setToggle, toggle, race, setRace, abScores, setAbScores }) {
    const [allRace, setAllRace]=useState([])
   const [traitDetails, setTraitDetails]=useState('')
    let raceArr=[]
    const [scoreBonus, setScoreBonus] = useState({})
    const [relRace, setRelRace]= useState([])
   const history = useHistory();
   const [traitToggle, setTraitToggle]=useState(false)
     const [show, setShow] = useState(false);
  const [nameShow, setNameShow]=useState(false)


   const handleRaceClick = (e) =>{
     e.preventDefault()
        setRace(e.target.value)
        setAbScores(abBonuses)
        setNameShow(!nameShow)
   }

//   const routeChange = () =>{ 
      
//     let path = `/new`; 
//     history.push(path);
//   }
  function handleSubmit(e) {
    e.preventDefault()
    setNameShow(false)
   setToggle(!toggle);
    
  }
  function handleTrait(trait){
        fetch(`https://www.dnd5eapi.co/api/traits/${trait}`)
        .then(r=>r.json())
        .then(a=>setTraitDetails(a.desc))
        setTraitToggle(!traitToggle)
        
  }
//     
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
   <>
   <Carousel variant="dark" style={{display:'block'}}>
       {relRace.length > 0 ? (relRace.map((r)=> (
  <Carousel.Item>
    <img style={{width:'100%'}} alt='class images' src={`/race_images/${r.name}.png`} />
    <Carousel.Caption style={{backgroundColor: 'grey'}}>
   <h3 >{r.name}</h3>
      {show? (

      <Alert onClose={() => setShow(false)} style={{width:'100%', position:'relative'}} dismissible>
      <text style={{fontWeight:'bold'}}>speed:</text> <text style={{fontWeight: 'bold'}}>{r.speed}</text><br/>
      <text style={{fontWeight:'bold'}}>alignment:</text> <text style={{fontWeight: 'bold'}}>{r.alignment}</text><br/>
      <text style={{fontWeight:'bold'}}>aging:</text> <text style={{fontWeight: 'bold'}}>{r.age}</text><br/>
      <text style={{fontWeight:'bold'}}>size:</text> <text style={{fontWeight: 'bold'}}>{r.size_description}</text><br/>
       <text style={{fontWeight:'bold'}}>ability score increases:</text> <br/>
       {(r.ability_bonuses.map((s)=>
        <><span>{s.ability_score.name}:</span><span> {s.bonus}</span><br/></>))}
        <text style={{fontWeight:'bold'}}>languages:</text><br/>
        {(r.languages.map((s)=>
        <><span>{s.name}</span><br /></>))}
        <text>{r.language_desc}</text><br/>
        <text style={{fontWeight:'bold'}}>racial traits: </text><br/>
        {(r.traits.map((s)=> <button onClick={()=>handleTrait(s.index)}>{s.name}</button>))}
        <br/>
        {traitToggle? traitDetails : ''}
      <form>
          <FormField>
              <Button value={r.index} type='submit' onClick={handleRaceClick}>Choose this race</Button>
          </FormField>
                  <FormField>
          </FormField>
        </form>
      </Alert>
      ): 
     <Button onClick={()=> setShow(true)}>learn more about this race</Button>}
    </Carousel.Caption>
  </Carousel.Item>
  ))) : (<p>nothing here</p>)}
  </Carousel>
  {nameShow?
   <Alert onClose={() => setNameShow(false)} style={{width:'100%', alignContent:'center'}} dismissible>
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
              <Button onClick={handleSubmit}>Choose this name</Button>
          </FormField>
        </form>
      </Alert>
        :
 <Button onClick={()=> setNameShow(true)}>name your character</Button>}
</>
 )
}

