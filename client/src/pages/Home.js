import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { CharacterSheet } from "./CharacterSheet"


function Home({ user }) {
    const [showSheet, setShowSheet]= useState(false)
    const [player, setPlayer] = useState({})
    function loadSheet(p) {
        setShowSheet(!showSheet)
        setPlayer()
    }
    // const baseUrl = "https://www.dnd5eapi.co/api"
    // let arr =[allClasses]
    // useEffect(() => {
    // fetch(baseUrl + "/classes/")
    // .then(r=>r.json())
    // .then(c => setAllClasses(c.results[0])
    // )}, [])

  return (
    <Wrapper>
            <Box>
              {user.players.map((p)=> (
                // <Button value={p} onClick={loadSheet(p)}>{p.character_name}</Button>
                <CharacterSheet player={p} />
              ))}

        {/* { showSheet ?  (<CharacterSheet player={player} />) : (<p></p> )} */}
                </Box>
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
