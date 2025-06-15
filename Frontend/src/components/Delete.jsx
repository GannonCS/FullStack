import { MdDelete } from "react-icons/md";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function Delete({exerciseId, setExercise}) {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const onDelete = async() => {
        const response = await fetch(
            `${backendUrl}/exercises/${exerciseId}`,
            {method: 'DELETE'}
        );
        if (response.status === 204) {
            alert(`Successfully deleted the exercise with _id = ${exerciseId}`);
            const response2 = await fetch(`${backendUrl}/exercises`);
            const updatedData = await response2.json();
            setExercise(updatedData);
        }
        else {
            alert(`Failed to delete exercise with _id = ${exerciseId}, status code = ${response.status}`);
        }
    }

    return (
        <button onClick={onDelete}>
            <MdDelete />
        </button>
    )
}

export default Delete;
