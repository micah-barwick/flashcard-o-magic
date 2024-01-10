import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../../utils/api/index"; // Adjust the path accordingly
import { useHistory, useParams } from "react-router-dom";
import FormComponent from "./FormComponent";
import "./CreateCard.css";

function CreateCard({}) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [decks, setDecks] = useState([]);

  const history = useHistory();

  const { deckId } = useParams();

  const handleFormSubmit = async (formData) => {
    try {
      const newCard = {
        front: formData.front,
        back: formData.back,
      };

      await createCard(deckId, newCard); // Convert deckId to a number

      setFront("");
      setBack("");

      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDecks(deckData);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };
    fetchData();
  }, [deckId]);

  return (
    <div className="create-card-container">
      <div className="cc-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{decks.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
      </div>

      <div className="cc-form">
        <h2>{decks.name}</h2>
        <FormComponent onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

export default CreateCard;