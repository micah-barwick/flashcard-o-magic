import React from "react";
import { Link, useRouteMatch } from "react-router-dom";


function AddCardButton({ deckId }) {
    const { url } = useRouteMatch();

    return (
        <button type="button" name="create-card" className="btn btn-primary" style={{ marginLeft: '10px'}}>
            {url === `/decks/${deckId}/study` ?
                <Link style={{ color: '#FFF' }} to={`/decks/${deckId}/cards/new`}>
                    Add Card
                </Link> :
                <Link style={{ color: '#FFF' }} to={`${deckId}/cards/new`}>
                    Add Card
                </Link>
            }
        </button>
    )
}

export default AddCardButton;