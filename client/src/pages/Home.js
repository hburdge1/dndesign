import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { CharacterSheet } from "./CharacterSheet"


function Home({ user }) {
    const [allPlayers, setAllPlayers]=useState([])
    const [player, setPlayer] = useState({})
    const [showSheet, setShowSheet]= useState(false)

      useEffect(() => {
    fetch("/players")
      .then((r) => r.json())
      .then(c=>setAllPlayers(c));
  }, []);

    function loadSheet(p) {
        setShowSheet(!showSheet)
        setPlayer(p)
    }
  return (
    <Wrapper>
      {allPlayers.map((p)=> (
                <>
                <Button value={p} onClick={()=>loadSheet(p)}>{p.character_name}</Button>
                <CharacterSheet player={p} />
                </>
              ))}
        {/* { showSheet ?  (<CharacterSheet player={player} />) : (<p></p> )} */}
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
