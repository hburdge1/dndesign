import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Tabs from '../styles/Tabs'
import ReactMarkdown from "react-markdown";
import { Error, FormField, Input, Button, Label, Textarea } from "../styles";
import { render } from "react-dom";


function NewCharacter({ user }) {
  console.log('loaded this')
  const [race, setRace] = useState("");
  const [playerClass, setPlayerClass] = useState("");
  const [allClasses, setAllClasses] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [playerBackground, setPlayerBackground]= useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const baseUrl = "https://www.dnd5eapi.co/api"

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

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
    useEffect(() => {
    fetch(baseUrl + "/classes/")
    .then(r=>r.json())
    .then(c => setAllClasses(c.results))
   }, [])
  return (
    <>
    <Tabs allClasses={allClasses}/>
     <Wrapper>
      <WrapperChild>
        <Tabs allClasses={allClasses}/>
        <form onSubmit={handleSubmit}>
          <FormField>
            {/* <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /> */}
          </FormField>
          <FormField>
            {/* <Label htmlFor="minutesToComplete">Minutes to complete</Label>
            <Input
              type="number"
              id="minutesToComplete"
              value={minutesToComplete}
              onChange={(e) => setMinutesToComplete(e.target.value)}
            /> */}
          </FormField>
          <FormField>
            {/* <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              rows="10"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            /> */}
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Recipe"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <ReactMarkdown></ReactMarkdown>
      </WrapperChild>
    </Wrapper>
    </>
  );
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
