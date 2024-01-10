// EditDeck.js
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readDeck,
  deleteCard,
  deleteDeck,
  listCards,
} from "../../utils/api/index";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./ViewDeck.css";

function ViewDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  
  
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        
        console.log("reading deck data: ", deckData);
        setDecks(deckData);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    const fetchCardData = async () => {
      const abortController = new AbortController();
      
      try {
        
        console.log("from within fetchCardData",deckId);
        const cardData = await listCards(deckId, abortController.signal);
        
        setCards(cardData);
        console.log("reading card data:", cardData);
        
      } catch (error) {
        console.error("Error fetching decks:", error);
        throw error;
      }
      finally{
        abortController.abort();
      }
    };

    fetchData();
    fetchCardData();
  }, [deckId]);

  const handleRemoveCard = async (selectedCard) => {
    try {
      await deleteCard(selectedCard.id);
      setCards((prevCards) =>
        prevCards.filter((card) => card.id !== selectedCard.id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteDeck = async () => {
    try {
      await deleteDeck(deckId); // Pass the deckId parameter
      history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="view-deck-container">
      <div className="vd-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {decks.name}
            </li>
          </ol>
        </nav>
      </div>
      <div className="vd-deck-container mb-4">
        <div className="card" style={{ border: "none" }}>
          <div className="card-body">
            <h5 className="card-title">{decks.name}</h5>

            <p className="card-text">{decks.description}</p>
          </div>

          <div className="vd-deck-button-container">
            <Link
              to={`/decks/${deckId}/edit`}
              className="btn btn-secondary btn-lg"
            >
              Edit
            </Link>
            <Link
              to={`/decks/${deckId}/study`}
              className="btn btn-primary btn-lg"
            >
              Study
            </Link>
            <Link
              to={`/decks/${deckId}/cards/new`}
              className="btn btn-primary btn-lg"
            >
              Add Cards
            </Link>
            <button onClick={handleDeleteDeck} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="vd-card-container">
        <h1 className="ms-3">Cards</h1>
        {cards && cards.map((card) => (
          <div key={card.id} className="card mb-4">
            <div className="card-body">
              <div className="cardFlex">
                <h2>{card.front}</h2>
                <h2>{card.back}</h2>
              </div>

              <div className="vd-card-button-container">
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary btn-lg"
                >
                  Edit Card
                </Link>
                <button
                  onClick={() => handleRemoveCard(card)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewDeck;