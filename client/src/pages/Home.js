import { useEffect, useState } from "react";
import { useHistory } from 'react-router'
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { Row, Col } from 'react-bootstrap'
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
        <Row>
        <Button onClick={()=>selfFetch()}>Show only my players</Button>
        <hr/>
        <Button onClick={()=>playerFetch()}>Show all players</Button>
        </Row>
        <hr/>
      {allPlayers !== [] ? (
        allPlayers.map((p)=> (
                <div style={{position:'relative', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Button onClick={()=>loadSheet(p)}>{p.character_name}</Button>
                <hr/>
                </div>
              ))) : (<p>Create a character to see its details here!</p>)}
        { showSheet ?  (<CharacterSheet player={player} />) : (<p></p> )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default Home;
