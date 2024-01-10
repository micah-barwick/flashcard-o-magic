import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../../utils/api";
import FormComponent from "./FormComponent";
import "./EditCard.css"

function EditCard() {
  const [card, setCard] = useState([]);

  const [front, setFront] = useState(card.front || "");
  const [back, setBack] = useState(card.back || "");

  const history = useHistory();
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

    console.log(card);
    fetchCard();
  }, [cardId]);

  const handleFormSubmit = async (formData) => {
    const abortController = new AbortController();

    if (!front.trim() || !back.trim()) {
      alert("Please enter both front and back.");
      return;
    }

    try {
      const cardToUpdate = {
        front: formData.front,
        back: formData.back,
        deckId: deckId,
        id: cardId,
      };

      // Update the card on the server
      await updateCard(cardToUpdate, abortController.signal);

      // Fetch the updated card from the server
      const updatedCard = await readCard(cardId);

      // Update the local state with the fetched card data
      setCard(updatedCard);
      console.log(card);

      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
    } finally {
      // Cleanup function: Cancel the signal when the component unmounts
      abortController.abort();
    }
  };

  return (
    <div className="edit-card-container">
      <div className="ec-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>View Deck</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {cardId}
            </li>
          </ol>
        </nav>
      </div>

      <div className="ec-form">
        <h2>Edit Card</h2>
        <FormComponent onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
export default EditCard;