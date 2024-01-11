import React from "react";
import AddCardButton from "./Buttons/AddCardButton";

function NotEnoughCards({ deckId }) {
    return (
        <div style={{ marginTop: '25px' }} className="jumbotron">
            <h3 className="display-4">Not enough cards.</h3>
            <p className="lead">You need at least 3 cards to study.</p>
            <AddCardButton deckId={deckId}/>
        </div>
    )
}

export default NotEnoughCards;