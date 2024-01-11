import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";
import NoCards from "../Shared/NoCards";
import StudyCard from "./StudyCard";
import NotFound from "../Shared/NotFound";

function StudyView() {
    const deckId = useParams().deckId;
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function loadCards() {
            const response = await readDeck(deckId);
            setDeck(response);
        }
        loadCards();
    }, [deckId])

    if (deck.id) {
        return (
            <div>
                <h1>{deck.name}</h1>
                <p>{deck.description}</p>
                {deck.cards.length < 3 ?
                    <NoCards deckId={deckId} /> :
                    <StudyCard cards={deck.cards} />
                }
            </div>
        )        
    }
    return <NotFound />
}

export default StudyView;