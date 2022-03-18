import React from 'react';
import { useState, useEffect } from 'react';
import { Accordion, Col, Row, Nav } from 'react-bootstrap'



export default function Tabs({ allClasses }) {
  const baseUrl = "https://www.dnd5eapi.co"
const [classDetails, setClassDetail] = useState([])

   useEffect(() => {allClasses.map((c) => (    
        fetch(`${baseUrl}${c.url}`)
        .then(r => r.json())
        .then(c => console.log(c))    
   ))}, [allClasses]
)
   

  return (
    <p></p>
  )
}