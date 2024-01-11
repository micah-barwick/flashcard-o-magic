import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../../utils/api";

function DeckForm() {
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const history = useHistory();
    const deckId = useParams().deckId;

    useEffect(() => {
        async function getDeckInfo() {
            try {
                if (deckId) {
                    const deckInfo = await readDeck(deckId)
                    setDeckName(deckInfo.name);
                    setDeckDescription(deckInfo.description);
                } 
            } catch (error) {
                throw error;
            }
        }    
        getDeckInfo();
    }, [deckId])

    const handleNameChange = (event) => {
        setDeckName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDeckDescription(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (deckName === "" || deckDescription === "") {
            window.alert("Please fill out the entire form")
        } else if (!deckId) {
            const response = await createDeck({ name: deckName, description: deckDescription });
            history.push(`${response.id}`)
        } else {
            updateDeck({ id: deckId, name: deckName, description: deckDescription })
            history.goBack()
        }
    }

    return (
        <div>
            {deckId ? 
                <h2>Edit Deck: {deckName}</h2> :
                <h2>Create Deck</h2>
            }
            <form>
                <div className="form-group">
                <label htmlFor="name">
                    Name:
                </label>
                <br />
                <input
                    id="name"
                        type="text"
                        className="form-control"
                    name="name"
                    onChange={handleNameChange}
                    value={deckName}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="description">
                    Description:                 
                </label>
                <br />   
                <textarea
                    id="description"
                        name="description"
                        className="form-control"
                    rows="4"
                    cols={50}
                    onChange={handleDescriptionChange}
                    value={deckDescription}
                >
                    </textarea>
                </div>
                <br />
                <button type="button" onClick={history.goBack}>
                    Cancel</button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default DeckForm;