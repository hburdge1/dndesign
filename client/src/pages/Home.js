import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { CharacterSheet } from "./CharacterSheet"

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/me")
      .then((r) => r.json())
      .then(setRecipes);
  }, []);

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
      ) : (
        <>
          <Button as={Link} to="/players">
            see my characters
          </Button>
          <span> </span>
          <Button as={Link} to="/games">
            see my campaigns
          </Button>
          <Button as={Link} to="/players/new">
            Create a new character
          </Button>
        </>
      )}
  <CharacterSheet/>
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
