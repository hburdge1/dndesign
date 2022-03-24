import { Carousel } from 'react-bootstrap'
import React from 'react'
import Popup from 'reactjs-popup'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Button, FormField, Label, Input } from '../styles'
import { Checkbox } from '@mui/material'
export default function ClassSelector({allClasses, allClassDetails, abScores, proficiencyState, setProficiencyState, setAbScores, playerClass, setPlayerClass}) {


    let indices=[]
    const handleSelectClass = (e) => {
        e.preventDefault()
        setPlayerClass(e.target.value)
           if(proficiencyState){
           console.log(proficiencyState)
   }
    }
  return (
       <Carousel variant="dark">
        {allClassDetails.length > 0 ? (allClassDetails.map((r)=> (
    <Carousel.Item>
    <img
      className="d-block w-100"
      src={`/class_images/${r.name}.jpg`}
    />
    <Carousel.Caption>
      <h3>{r.name}</h3>
      <p>{r.age}</p>
      <br/>
      <p>speed: {r.speed}</p>
       <Popup trigger={<button>learn more</button>}  position="right-center">
                 <>
         {r.proficiency_choices.map((a)=> ( 
             <>
         <span>Choose {a.choose}</span> 
             <ToggleButtonGroup
      name="value"
      type="checkbox"
    >{a.from.map((b)=> <>
        <div class="form-check form-check-inline" >
  <input class="form-check-input" type="checkbox" onChange={() => { proficiencyState? (setProficiencyState([...proficiencyState, (b.name)])) : (proficiencyState.push(b.name))}} />
  <label class="form-check-label" for="inlineCheckbox1">{b.name}</label>
    </div>
        </>)}</ToggleButtonGroup>
         </>
         ))}
         </>
       </Popup>
      <form >
           <FormField>
            <Label htmlFor="character_name">Name your character</Label>
            <Input
            //   type="text"
            //   id="character_name"
            //   value={characterName}
            //   onChange={(e) => setCharacterName(e.target.value)}
            />
          </FormField>
          <FormField>
              <Button onClick={handleSelectClass} value={r.index}>Choose this class</Button>
          </FormField>
                    <FormField>
          </FormField>
        </form>
    </Carousel.Caption>
   </Carousel.Item>))):(<p>nothing here</p>)}
  </Carousel>
  )}
