import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
// import Header from "./Shared/Header";
// import NotFound from "./Shared/NotFound";
import DeckList from "./Deck/DeckList.js";
import { listDecks } from '../utils/api/index.js'
import BreadcrumbNavbar from "./Shared/BreadcrumbNavbar";
import CreateDeckButton from "./Shared/Buttons/CreateDeckButton";
import DeckForm from "./Deck/DeckForm";
import DeckView from "./Deck/DeckView.js";
import CardForm from "./Cards/CardForm";
import StudyView from "./Study/StudyView";

function Layout() {
  const [decks, setDecks] = useState([]);
  
  useEffect(() => {
    async function getDecksFromApi() {
      const response = await listDecks();
      setDecks(response);
    }
    getDecksFromApi();
  }, [])

  return (
    <div>
      <Header />
      <BreadcrumbNavbar decks={decks} />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />   
            {decks ?
              <DeckList decks={decks} /> :  
              <NotFound />
            }
          </Route>

          <Route path="/decks/new">
            <DeckForm />
          </Route>

          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>

          <Route path="/decks/:deckId/study">
            <StudyView />
          </Route>

          <Route path="/decks/:deckId/edit"> 
            <DeckForm />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <CardForm />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardForm />
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