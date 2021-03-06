import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CharacterSheet } from "../pages/CharacterSheet";
import { Button } from "../styles";

function NavBar({ user, setUser, players }) {

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">DNDesign</Link>
      </Logo>
      <Nav> 
{/* 
        <Button as={Link} to="/me"> */}
           {/* <Button as={Link} to="/me">
            see my characters
          </Button>
          <span> </span>
          <Button as={Link} to="/games">
            see my campaigns
          </Button> */}
          <Button as={Link} to="/new">
            Create a new character
          </Button>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: cursive;
  font-size: 3rem;
  color: red;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;
