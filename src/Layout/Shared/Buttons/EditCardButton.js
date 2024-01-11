import React from "react";
import { Link } from "react-router-dom";

function EditCardButton({ cardId, deckId }) {
    return (
        <button type="button" name="edit-card" className="btn btn-primary">
            <Link to={`${deckId}/cards/${cardId}/edit`} style={{ color: '#FFF' }}>Edit Card</Link>
        </button>
    )
}

export default EditCardButton;