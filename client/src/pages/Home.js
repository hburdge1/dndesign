import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { CharacterSheet } from "./CharacterSheet"

function Home() {
  const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   fetch(baseUrl + "classes")
  //   .then(r=>r.json())
  //   .then(ra => console.log(ra))
  // }, [])

  return (
    <Wrapper>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Recipe key={recipe.id}>
            <Box>
              <h2>{recipe.title}</h2>
              <p>
              </p>
              <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
            </Box>
          </Recipe>
        ))
      ) : (<p></p>

      )}

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
