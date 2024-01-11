import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readCard, readDeck, updateCard } from "../../utils/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./CardForm.css"

function CardForm({ front = "", back = ""  }) {
    const [question, setQuestion] = useState(front);
    const [answer, setAnswer] = useState(back);
    const [deck, setDeck] = useState({});
    const deckId = useParams().deckId;
    const cardId = useParams().cardId;
    const history = useHistory();

    const handleFrontChange = (event) => {
        setQuestion(event.target.value)
    }

    const handleBackChange = (event) => {
        setAnswer(event.target.value);
    }

    useEffect(() => {
        async function getDeckInfo() {
            const response = await readDeck(deckId)
            setDeck(response);
        }
        getDeckInfo();
    }, [deckId])

    useEffect(() => {
        async function getCardInfo() {
            try {
                if (cardId) {
                    const response = await readCard(cardId);
                    setQuestion(response.front);
                    setAnswer(response.back);
                } 
            } catch (error) {
                throw error;
            }
        }
        getCardInfo()
    }, [cardId])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (question === "" || answer === "") {
            window.alert("Please make sure all form fields are completed");
        } else if (!cardId) {
            createCard(deckId, { front: question, back: answer });
            setQuestion('');
            setAnswer('');
        } else {
            updateCard({id: cardId, deckId: deck.id, front: question, back: answer })
            history.push(`/decks/${deckId}`)
        }
    }
    
    return (
        <div>
            <h1>{deck.name}</h1>
            {cardId ? 
                <h2>Edit Card</h2> : 
                <h2>Add Card</h2>
            }           
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="question">
                    Front:
                </label>
                <br />
                    <textarea
                        id="question"
                        name="question"
                        className="form-control"
                        rows={2}
                        cols={50}
                        onChange={handleFrontChange}
                        value={question}
                    >
                    </textarea>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="answer">
                        Back:
                    </label>
                    <br />
                    <textarea
                        id="answer"
                        name="answer"
                        className="form-control"
                        rows={2}
                        cols={50}
                        onChange={handleBackChange}
                        value={answer}
                    >
                    </textarea>
                </div>
                <br />
                <button type="button" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                <button type="submit">Save</button>
            </form>
        </div>
    )

}

export default CardForm;