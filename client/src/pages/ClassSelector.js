import { Carousel } from 'react-bootstrap'
import React from 'react'
import Popup from 'reactjs-popup'
import { useEffect, useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Button, FormField, Label, Input } from '../styles'
export default function ClassSelector({allClasses, allClassDetails, toggle, setToggle, abScores, proficiencyState, setProficiencyState, setAbScores, playerClass, setPlayerClass}) {
    let indices=[]
    
    const handleSelectClass = (e) => {
        e.preventDefault()
        setPlayerClass(e.target.value) 
        setToggle(!toggle);
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

       <Popup trigger={<button>learn more</button>}  style={{width: '100%', backgroundColor: 'grey'}}>
      <>
         {r.proficiency_choices.map((a)=> ( 
             <>
  <span style={{width: '100%', backgroundColor: 'grey', fontWeight: 'bold'}}>Choose {a.choose}</span> 
             <ToggleButtonGroup
      name="value"
      type="checkbox"
    >{a.from.map((b)=> <>
  <div class="form-check form-check-inline" style={{width: '100%', backgroundColor: 'grey'}}>
    
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
              <Button onClick={handleSelectClass} value={r.index}>Choose this class</Button>
          </FormField>
            <FormField>
          </FormField>
        </form>
    </Carousel.Caption>
   </Carousel.Item>))):(<p>nothing here</p>)}
  </Carousel>
  )}


  