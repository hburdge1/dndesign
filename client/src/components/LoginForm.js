import React, { useState } from "react";
import { Button, Error, Input, FormField, Label} from "../styles";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LoginForm({ onLogin }) {
const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const history = useHistory();

    function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

   return (
     <>
           <Logo>
        <Link to="/">DNDesign</Link>
      </Logo>
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormField>
      <FormField>
        {/* {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))} */}
      </FormField>
    </form>
    </>
  );
}
export default LoginForm;
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