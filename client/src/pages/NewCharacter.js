
import { useHistory } from "react-router";
import styled from "styled-components";
import { Tabs, Tab, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Error, FormField, Input, Button, Label, Textarea } from "../styles";
import * as React from 'react';
import { useState, useEffect } from "react";
import CheckboxesGroup from "../styles/checkboxesGroup";
function NewCharacter({ user }) {
  console.log('loaded this')
  const [race, setRace] = useState("");
  const [playerClass, setPlayerClass] = useState("");
  const [allClasses, setAllClasses] = useState([]);
  const [allClassDetails, setAllClassDetails] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [playerBackground, setPlayerBackground]= useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const baseUrl = "https://www.dnd5eapi.co/api"
  let urlArr=[]

   let indices = []
  useEffect(() => {
    fetch(baseUrl + "/classes/")
    .then(r=>r.json())
    .then(c => setAllClasses(c.results))
   }, [indices])
  
   urlArr = allClasses.map(r=>r.url)
     urlArr.forEach((e) => (
        fetch(`https://www.dnd5eapi.co${e}`)
        .then(r => r.json())
        .then((c) => {
          if (allClassDetails.length < 11){
          allClassDetails.push(c)
        }
        })
             
     ))
      let profArr=[]
     allClassDetails.forEach((a, i)=> profArr.push(<CheckboxesGroup proficiencies={a.proficiencies.map(a=>a.name)}/>))
     console.log(profArr)
    let saveArr=[]
     allClassDetails.forEach((a, i)=> saveArr.push(<ul>{a.saving_throws.map(a=><li>{a.name}</li>)}</ul>))
     let levelArr=[]
     let nameArr=[]
     allClassDetails.forEach((a)=> nameArr.push(a.index))

        // fetch(`https://www.dnd5eapi.co/api/classes/${playerClass}/levels`)
        // .then(r=>r.json())
        // .then(a=> levelArr.push(a))

      //   let classProficiencyChoices=
      //  Object.keys(allClassDetails.proficiencies).map((key)=> {
      //   return <p>{allClassDetails.proficiencies[key]}</p>
      // })


        console.log(levelArr)
    allClassDetails.forEach((a, i)=> indices.push(
    <Tab eventKey={a.index} title={a.index}>
      hit die = {a.hit_die}
      <br/>
      {profArr[i]}
      <br />
      {saveArr}
      <br/>

    </Tab>)
    )

  
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "player class": {playerClass}
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <>
  <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3">
    {indices}
 </Tabs>
  {/* <Form onSubmit={handleSubmit}>

  </Form> */}
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
