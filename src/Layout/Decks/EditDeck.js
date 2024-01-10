import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../../utils/api/index"; // Adjust the path accordingly
import { useParams, useHistory } from "react-router-dom";

import "./EditDeck.css";

function EditDeck() {
  const [deck, setDeck] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  const { deckId } = useParams();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Please enter both a deck name and description.");
      return;
    }

    try {
      const newDeck = {
        id: deckId,
        name,
        description,
      };

      await updateDeck(newDeck);

      history.push(`/decks/${deckId}`);

      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deck = await readDeck(deckId);
        setDeck(deck || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [deckId, setDeck]);

  useEffect(() => {
    // Set the initial values of 'name' and 'description' when the 'deck' prop changes
    setName(deck.name || "");
    setDescription(deck.description || "");
  }, [deck]);

  return (
    <div className="edit-deck-container">
      <div className="ed-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="breadcrumb-text">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`} className="breadcrumb-text">
                View Deck
              </a>
            </li>
            <li className="breadcrumb-item active breadcrumb-text">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>

      <div className="ed-form">
        <h2>Edit Deck</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="formName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formName"
              placeholder={deck.name}
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="formDescription"
              rows={3}
              placeholder={deck.description}
              value={description || ""}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="ed-button-container">
            <a href="/" className="btn btn-primary">
              Cancel
            </a>
            <button type="submit" className="btn btn-primary submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDeck;