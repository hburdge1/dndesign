import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import AccordionSet from '../styles/AccordionSet'



export default function Tabs({ allClasses, setAllClasses, urlArr}) {
  const baseUrl = "https://www.dnd5eapi.co"
  const [classDetails, setClassDetail] = useState([])
    console.log(urlArr)
   let arr = []
   useEffect(()=> {
     urlArr.forEach((e) => (
        fetch(`https://www.dnd5eapi.co${e}`)
        .then(r => r.json())
        .then(c => arr.push(c))
     ))
    
  }, [allClasses])
  console.log(arr)
  return (
    <Box>
        <AccordionSet arr={arr}/>
    </Box>
  )
}