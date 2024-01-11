import React from "react";
import EditCardButton from "../Shared/Buttons/EditCardButton";
import DeleteCardButton from "../Shared/Buttons/DeleteCardButton";
import EditDeckButton from "../Shared/Buttons/EditDeckButton";
import StudyButton from "../Shared/Buttons/StudyButton";
import AddCardButton from "../Shared/Buttons/AddCardButton";

const deckBoxStyle = {
    listStyle: "none",
    margin: "10px",
    padding: "20px",
    width: "100%"
}

const deckListStyle = {
    border: "solid",
    boxSizing: "content-box",
    borderRadius: "30px",
    width: "auto",
    margin: "10px"
}

function CardList({ deck }) {
    return (
        <div>
            <div className="jumbotron">
                <h1 className="display-4">{deck.name}</h1>
                <p className="lead">{deck.description}</p>
                {/* Relace these buttons with the appropriate button bar */}
                <EditDeckButton/>
                <StudyButton deckId={deck.id} />
                <AddCardButton deckId={deck.id} />
            </div>
            <div>
                <h2>Cards</h2>
                <ul>
                {deck.cards.map((card) => (
                <div style={deckListStyle}>
                    <li key={card.id} style={deckBoxStyle}>
                        <p><strong>Question: </strong>{card.front}</p>
                        <p><strong>Answer: </strong>{card.back}</p>
                        <EditCardButton cardId={card.id} deckId={deck.id} />
                        <DeleteCardButton cardId={card.id} deckId={deck.id} />
                    </li>
                </div>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default CardList;