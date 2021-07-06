import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserPage from "./components/UserPage";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage></LandingPage>
          </Route>
          <Route path="/searchresults">
            <SearchResults></SearchResults>
          </Route>
          <Route path="/users/:id">
            <UserPage />
          </Route>
        </Switch>
        
      )}
      <Footer></Footer>

    </BrowserRouter>
  );
}

export default App;
