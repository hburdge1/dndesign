import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NewCharacter from "../pages/NewCharacter";
import { CharacterSheet } from "../pages/CharacterSheet";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  
  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} players={user.players}/>
      <main>
        <Switch>
          <Route path="/new">
            <NewCharacter user={user} />
          </Route>
          <Route path="/">
            <Home user={user}/>
          </Route>
          <Route path="/sheet">
          <CharacterSheet user={user}/>
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default withRouter(App);
