import React from "react";
import { Link, useParams } from "react-router-dom";

function EditDeckButton() {
    const deckId = useParams().deckId;

    return (
        <button type="button" name="edit-deck" className="btn btn-primary">
            <Link to={`${deckId}/edit`} style={{ color: '#FFF'}}>Edit</Link>
        </button>
    )
}

export default EditDeckButton;