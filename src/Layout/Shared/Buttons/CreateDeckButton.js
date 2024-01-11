import React from "react";
import {Link } from "react-router-dom";

function CreateDeckButton() {
    return (
        <button type="button" className="btn btn-primary" style={{ margin: '25px'}} >
            <Link style={{ color: '#FFF' }} to="/decks/new">Create New Deck</Link>
        </button>
    )
}

export default CreateDeckButton;