import Row from './Row'

function Table({exercises, setExercise, onEdit}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise) =>
                    <Row key={exercise._id} exercise={exercise} setExercise={setExercise} onEdit={onEdit}/>
                )}
            </tbody>
        </table>
    )
}

export default Table;