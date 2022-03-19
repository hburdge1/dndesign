import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import AccordionSet from '../styles/AccordionSet'



export default function Tabs({ allClasses, setAllClasses, }) {
  const baseUrl = "https://www.dnd5eapi.co"
  const [classDetails, setClassDetail] = useState([])
  let c = Array.from(allClasses).map((a)=> a.url)
   let arr = []
   useEffect(()=> {
    c.forEach((e) => (
        fetch(`https://www.dnd5eapi.co${e}`)
        .then(r => r.json())
        .then(c => arr.push(c))
     ))
    
  }, [allClasses])

  return (
    <Box>
        <AccordionSet classDetails={classDetails} setClassDetail={setClassDetail} arr={arr}/>
    </Box>
  )
}