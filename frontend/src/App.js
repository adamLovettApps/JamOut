import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserPage from "./components/UserPage";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import DeleteProfile from "./components/DeleteProfile";
import ConversationsBar from "./components/ConversationsBar";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App({socket}) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navigation isLoaded={isLoaded} />
      {user && <ConversationsBar socket={socket}></ConversationsBar>}
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
          <Route path="/deleteProfile">
            <DeleteProfile></DeleteProfile>
          </Route>
        </Switch>
        
      )}
      <Footer></Footer>

    </BrowserRouter>
  );
}

export default App;
