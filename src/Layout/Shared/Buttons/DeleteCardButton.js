import React from "react";
import { deleteCard } from "../../../utils/api";

function DeleteCardButton({ cardId }) {

    const handleDelete = async (event) => {
        event.preventDefault();
        await deleteCard(cardId);
        window.location.reload();
    } 

    return (
        <button
            onClick={handleDelete}
            className="btn btn-danger"
            style={{ float: 'right', marginRight: '25px'}}
            >
            Delete
        </button>
    );
}

export default DeleteCardButton;