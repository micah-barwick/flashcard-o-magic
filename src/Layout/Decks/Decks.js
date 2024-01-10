import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api/index";
import { deleteDeck } from "../../utils/api/index";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CreateDeckButton from "./CreateDeckButton";

import "./Decks.css";

function Decks() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decksData = await listDecks();
        setDecks(decksData || []);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteDeck = async (selectDeck) => {
    const isConfirmed = window.confirm(
      `Delete this deck?\n\nYou will not be able to recover it.`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await deleteDeck(selectDeck.id);

      setDecks((prevDecks) =>
        prevDecks.filter((deck) => deck.id !== selectDeck.id)
      );
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  const handleViewDeck = async (deckToView) => {
    console.log(deckToView.id);
    history.push(`/decks/${deckToView.id}`);
  };

  return (
    <div className="card-container">
      <CreateDeckButton />
      {decks.map((deck) => (
        <div key={deck.id} className="mb-4 card">
          <div className="cardTitle">
            <p className="name">{deck.name}</p>
            <p className="number">{deck.cards.length} cards</p>
          </div>

          <p className="description">{deck.description}</p>
          <div className="button-container">
            <div className="button-group">
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={() => handleViewDeck(deck)}
              >
                View
              </button>

              <Link to={`/decks/${deck.id}/study`} className="button-link">
                <button type="button" className="btn btn-secondary">
                  Study
                </button>
              </Link>
            </div>

            {/* Trash Button */}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteDeck(deck)}
            >
              Delete
              <i className="fas fa-trash-alt"></i> {/* Icon here */}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Decks;