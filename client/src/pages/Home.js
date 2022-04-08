import { useEffect, useState } from "react";
import { useHistory } from 'react-router'
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { CharacterSheet } from "./CharacterSheet"


function Home({ user }) {
    const [allPlayers, setAllPlayers]=useState([])
    const [player, setPlayer] = useState({})
    const [showSheet, setShowSheet]= useState(false)
      const history = useHistory();
    console.log(allPlayers)
   useEffect(() => {
    fetch(`/users/${user.id}`)
      .then((r) => r.json())
      .then(c=>setAllPlayers(c.players));
  }, []);

  function playerFetch(){
    fetch("/players")
      .then((r) => r.json())
      .then(c=>setAllPlayers(c));

  }
  function selfFetch(){
          fetch(`/users/${user.id}`)
      .then((r) => r.json())
      .then(c=>setAllPlayers(c.players));
  }
    function loadSheet(p) {
        setShowSheet(!showSheet)
        setPlayer(p)
    }
  return (
    <Wrapper>
        <Button onClick={()=>selfFetch()}>Show only my players</Button>
        <Button onClick={()=>playerFetch()}>Show all players</Button><br/>
      {allPlayers? (
        allPlayers.map((p)=> (
                <>
                <Button onClick={()=>loadSheet(p)}>{p.character_name}</Button>
                
                </>
              ))) : (<p>Create a character to see its details here!</p>)}
        { showSheet ?  (<CharacterSheet setPlayer={setPlayer} player={player} />) : (<p></p> )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;


export default Home;
