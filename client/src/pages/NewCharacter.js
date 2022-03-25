
import { useHistory } from "react-router";
import styled from "styled-components";
import { Tabs, Tab } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Error, FormField, Button, Label, Textarea } from "../styles";
import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import ClassSelector from "./ClassSelector";
import RaceSelector from "./RaceSelector";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import AbilityScorer from "./AbilityScorer";
import { CharacterSheet } from "./CharacterSheet";
function NewCharacter({ user }) {
      const [characterName, setCharacterName] = useState("")
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
      console.log(abScores['CON'])
      
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
       skills: abScores,
       proficiencies: proficiencyState
      }),
    }).then((r) => {
         setIsLoading(false);
      if (r.ok) {
        history.push("/")
      } else {
    
      }
    });

  }
    // function handleChange(e){
    //   setPlayerClass(e.target.checked)
    //   console.log(e.target.checked)
    // }
  

  return (
    <>
  <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3" >
    {indices}
 </Tabs>
  <Box sx={{ display: 'flex' }}>
      <FormControl
        required
      
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
      </FormControl>
        </Box>

        <Button onClick={()=>setToggle(!toggle)}>select a race</Button>
        {toggle? (
          <RaceSelector user={user} setToggle={setToggle} toggle={toggle} race={race} setRace={setRace} characterName={characterName} setCharacterName={setCharacterName} abScores={abScores} setAbScores={setAbScores}/>) : (<p></p>)}
        <Button onClick={()=>setToggleClass(!toggleClass)}>select a class</Button>
        {toggleClass? (
          <ClassSelector allClasses={allClasses} allClassDetails={allClassDetails} proficiencyState={proficiencyState} setProficiencyState={setProficiencyState} abScores={abScores} setAbScores={setAbScores} playerClass={playerClass} setPlayerClass={setPlayerClass}/>) : (<p></p>)}
        {toggleScorer? (<AbilityScorer abScores={abScores} setAbScores={setAbScores} />):(<p></p>)}
         <Button onClick={()=>setToggleScorer(!toggleScorer)}>Roll your scores</Button>
        <Button onClick={handleSheet}>Create this character</Button>


  </>
  );
  // eslint-disable-next-line no-unreachable
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewCharacter;
