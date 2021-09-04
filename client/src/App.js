import React from "react";
import CreatePost from "./pages/CreatePost/CreatePost";
import LandingPage from "./pages/landingPage/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
function App() {
  return (

    <div className="app__container">
      <Router>
        <Switch>
          <Route path="/create">
            <CreatePost />
          </Route>
          <Route path="/">
          <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
