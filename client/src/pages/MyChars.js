import { useEffect, useState } from "react";
import { useHistory } from 'react-router'
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { CharacterSheet } from "./CharacterSheet"


function MyChars({ user, players }) {
    const [allPlayers, setAllPlayers]=useState([])
    const [player, setPlayer] = useState({})
    const [showSheet, setShowSheet]= useState(false)
      const history = useHistory();


      useEffect(() => {
    fetch("/me")
      .then((r) => r.json())
      .then(c=>setAllPlayers(c));
  }, []);

    setAllPlayers(players)
    console.log(allPlayers)

    function loadSheet(p) {
        setShowSheet(!showSheet)
        setPlayer(p)
    }
  return (
      <>
      please load this
      {allPlayers.map((p)=> (
                <>
                <Button onClick={()=>loadSheet(p)}>{p.character_name}</Button>
                </>
            ))}
</>
)}
const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default MyChars