import React from "react";
import { Route, Switch} from "react-router-dom";
import CreateDeck from "./Decks/CreateDeck";
import Header  from "./Header";
import Decks  from "./Decks/Decks";
import ViewDeck from "./Decks/ViewDeck"
import ViewStudy  from "./Study/ViewStudy";
import NotFound  from "./NotFound";
import EditDeck from "./Decks/EditDeck";
import CreateCard from "./Cards/CreateCard";
import EditCard from "./Cards/EditCard";

function Layout() {
  return (
    <div>
    <Header />
    <div className="container">
      <Switch>
        <Route exact path="/">
          <Decks />
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck />
        </Route>
        <Route exact path ="/decks/:deckId">
          <ViewDeck />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route exact path ="/decks/:deckId/cards/new">
          <CreateCard />
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <ViewStudy />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
    </div>
  );
}

export default Layout;