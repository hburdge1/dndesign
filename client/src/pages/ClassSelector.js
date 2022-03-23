import { Carousel } from 'react-bootstrap'
import React from 'react'
import { useEffect, useState } from 'react'
import { Button, FormField, Label, Input } from '../styles'
export default function ClassSelector({allClasses, allClassDetails}) {
    console.log(allClassDetails)
    let indices=[]


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
              <Button value={r.index}>Choose this class</Button>
          </FormField>
                    <FormField>
          </FormField>
        </form>
    </Carousel.Caption>
   </Carousel.Item>))):(<p>nothing here</p>)}
  </Carousel>
  )}
