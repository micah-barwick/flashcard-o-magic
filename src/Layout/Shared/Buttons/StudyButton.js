import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function StudyButton({ deckId}) {
    return (
        <button type="button" className="btn btn-primary" style={{ marginLeft: '10px'}}>
            <Link to={`/decks/${deckId}/study`} style={{ color: '#FFF'}}>Study</Link>
        </button>
    )
}

export default StudyButton;