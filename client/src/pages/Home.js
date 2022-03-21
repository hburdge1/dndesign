import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { CharacterSheet } from "./CharacterSheet"

function Home() {
    // const [allClasses, setAllClasses] = useState([]);
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
          
              <h2></h2>
              <p>
              </p>
              <ReactMarkdown></ReactMarkdown>
            </Box>

        ))
      ) : (<p></p>

      )

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
