import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import Home from "../pages/Home";
import RaceSelector from "../pages/RaceSelector";
import NewCharacter from "../pages/NewCharacter";


function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // auto-login
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  
  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewCharacter user={user} />
          </Route>
          <Route path="/character_creator">
            <RaceSelector user={user} />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
