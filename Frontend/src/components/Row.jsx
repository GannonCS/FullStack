import Delete from './Delete'
import { FaEdit } from "react-icons/fa";

function Row({exercise, setExercise, onEdit}) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <button onClick={() => onEdit(exercise)}>
                    <FaEdit/>
                </button>
            </td>
            <td><Delete exerciseId={exercise._id} setExercise={setExercise}/></td>
        </tr>
    )
}

export default Row;