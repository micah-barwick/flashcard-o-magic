// CardForm.js
import React, { useState, useEffect } from "react";
import { updateCard, readCard } from "../../utils/api";
import { useHistory, useParams } from "react-router-dom";

function CardForm({ onSubmit }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [card, setCard] = useState([]);
  const { deckId, cardId } = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const card = await readCard(cardId);
        setFront(card.front);
        setBack(card.back);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCard();
  }, [cardId]);

  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };

  const handleBackChange = (event) => {
    setBack(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ front, back });
    setFront("");
    setBack("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          type="text"
          className="form-control"
          id="front"
          placeholder={front}
          value={front}
          onChange={handleFrontChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="back"
          rows={3}
          placeholder={back}
          value={back}
          onChange={handleBackChange}
        />
      </div>

      <div className="cc-button-container">
        <button type="submit" className="btn btn-primary">
          Done
        </button>
        <button type="button" className="btn btn-secondary">
          Save
        </button>
      </div>
    </form>
  );
}

export default CardForm;