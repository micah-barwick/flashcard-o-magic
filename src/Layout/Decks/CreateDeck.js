import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
import { Link } from "react-router-dom";

function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDeck = {
        name,
        description,
      };

      await createDeck(newDeck);
      history.push("/");

      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div className="create-deck-container">
      <div className="cd-breadcrumb-main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="breadcrumb-text">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>

      <div className="cd-form">
        <h2>Create Deck</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="formName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formName"
              placeholder="Deck Name"
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
              placeholder="Brief description of the deck"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="cd-button-container">
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>

            <button type="submit" className="btn btn-primary submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;