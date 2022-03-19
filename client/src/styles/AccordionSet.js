
import React from 'react'
import { useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

export default function AccordionSet({ arr,  classDetails, setClassDetail }) {
    let indexArr=[]
    let indices = arr.map((e)=>(<li>{e.index}</li>))
   
  return (
      <>
        <ul>
           {indices}
        </ul>
        </>
  )
}
