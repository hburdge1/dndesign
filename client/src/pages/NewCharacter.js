
import { useHistory } from "react-router";
import styled from "styled-components";
import { Tabs, Tab } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Error, FormField, Button, Label, Box, Textarea } from "../styles";
import * as React from 'react';
import { useState, useEffect } from "react";
import ClassSelector from "./ClassSelector";
import RaceSelector from "./RaceSelector";
import AbilityScorer from "./AbilityScorer";
import { CharacterSheet } from "./CharacterSheet";
import {Container, Row, Col }from'react-bootstrap'
function NewCharacter({ user }) {
  const [characterName, setCharacterName] = useState("")
  const [autoProficiency, setAutoProficiency]=useState([])
  const [abBonuses, setAbBonuses] = useState({STR: 0, CON: 0, CHA: 0, WIS: 0, INT: 0, DEX: 0})
  const [race, setRace] = useState("");
  const [playerClass, setPlayerClass] = useState(""); 
  const [allClasses, setAllClasses] = useState([]);
  const [allClassDetails, setAllClassDetails] = useState([]);
  const [errors, setErrors] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [playerBackground, setPlayerBackground]= useState('');
  const [toggleClass, setToggleClass]=useState(false)
  const [proficiencyState, setProficiencyState]= useState([])
  const [toggle, setToggle] = useState(false);
  const [toggleScorer, setToggleScorer]=useState(false)
  const history = useHistory();
  const [abScores, setAbScores]= useState({STR: 0, CON: 0, CHA: 0, WIS: 0, INT: 0, DEX: 0})
    const [hitPoints, setHitPoints]=useState(0)
  const baseUrl = "https://www.dnd5eapi.co/api"
  let urlArr=[]
    const [isLoading, setIsLoading] = useState(false);
   let indices = []
  useEffect(() => {
    fetch(baseUrl + "/classes/")
    .then(r=>r.json())
    .then(c => setAllClasses(c.results))
   }, [])
  console.log({race})
   urlArr = allClasses.map(r=>r.url)
   if (urlArr){
     urlArr.forEach((e) => (
        fetch(`https://www.dnd5eapi.co${e}`)
        .then(r => r.json())
        .then((c) => {
          if (allClassDetails.length < 12){
          allClassDetails.push(c)
        }
        })
             
     ))
      }
    
      
      let profArr=[]
    //  allClassDetails.forEach((a, i)=> profArr.push(<CheckboxesGroup proficiencyState={proficiencyState} setProficiencyState={setProficiencyState}/>))
     
    let saveArr=[]
     allClassDetails.forEach((a, i)=> saveArr.push(<ul>{a.saving_throws.map(a=><li>{a.name}</li>)}</ul>))
     let levelArr=[]
     let nameArr=[]
     allClassDetails.forEach((a)=> nameArr.push(a.index))
 
 const handleSheet=()=>{
  
   setIsLoading(true);
   fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       user_id: user.id,
       character_race: race,
       character_class: playerClass,
       character_name: characterName,
       skills: {
         'CON': (abScores['CON'] + abBonuses['CON']),
         'WIS': (abScores['WIS'] + abBonuses['WIS']),
         'INT': (abScores['INT'] + abBonuses['INT']),
         'STR': (abScores['STR'] + abBonuses['STR']),
         'DEX': (abScores['DEX'] + abBonuses['DEX']),
         'CHA': (abScores['CHA'] + abBonuses['CHA']),
      },
       proficiencies: proficiencyState,
       level: 1
      }),
    }).then((r) => {
         setIsLoading(false);
            if (r.ok) {
        history.push("/");
      }
    });
  }
    
    // function handleChange(e){
    //   setPlayerClass(e.target.checked)
    //   console.log(e.target.checked)
    // }
  console.log(abBonuses)

  return (
  <Container style={{alignContent:'center', width:'100%', flexDirection:'column'}} >

      <Row>
       {(characterName !== '')&&(toggle==false) ? <span style={{width:'100%'}}>{characterName}</span> : <p></p>}
        {race === ('')? <Button onClick={()=>setToggle(!toggle)}>select a race</Button> : <Button style={{backgroundColor: 'grey'}} onClick={()=>setToggle(!toggle)}>race: {race}</Button>}

        {toggle? (
          <RaceSelector user={user} setToggle={setToggle} toggle={toggle} race={race} setRace={setRace} setAbBonuses={setAbBonuses} abBonuses={abBonuses} characterName={characterName} setCharacterName={setCharacterName} abScores={abScores} setAbScores={setAbScores}/>) : (<p></p>)}
        {playerClass === ('')? <Button onClick={()=>setToggleClass(!toggleClass)}>select a class</Button> : <Button style={{backgroundColor: 'grey'}} onClick={()=>setToggle(!toggle)}>class: {playerClass}</Button>}
        {toggleClass? (
          <ClassSelector allClasses={allClasses} allClassDetails={allClassDetails} setToggle={setToggleClass} toggle={toggleClass} proficiencyState={proficiencyState} setProficiencyState={setProficiencyState} abScores={abScores} setAbScores={setAbScores} playerClass={playerClass} setPlayerClass={setPlayerClass}/>) : (<p></p>)}
        {toggleScorer? (<AbilityScorer abScores={abScores} hitPoints={hitPoints} setHitPoints={setHitPoints} abBonuses={abBonuses} allClassDetails={allClassDetails} setAbScores={setAbScores} playerClass={playerClass}/>):(         <Button onClick={()=>setToggleScorer(!toggleScorer)}>Roll your scores</Button>)}
          <br/>
          <br/>
          { toggleScorer && playerClass && race && characterName?
                 (<Button onClick={handleSheet}>Create this character</Button>) :(<p></p>)
          }
   </Row>


  </Container>
  );
  // eslint-disable-next-line no-unreachable
}

const Wrapper = styled.div`
  color: red;
  background-color: mistyrose;
  border-radius: 6px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
`;

const Alert = styled.span`
  background-color: white;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  font-weight: bold;
  display: grid;
  place-content: center;
`;

const Message = styled.p`
  margin: 0;
`;
export default NewCharacter;
