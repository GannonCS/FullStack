import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import React from 'react';

function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("lbs");
    const [date, setDate] = useState("");

    const onCreate = async() => {
        const response = await fetch(
            `/exercises/`,
            {method: 'POST',  headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, reps: Number(reps), weight: Number(weight), unit, date }),}
        );
        if (response.status === 201) {
            alert(`Successfully created the exercise!`);  
        }
        else {
            alert(`Failed to create exercise, status code = ${response.status}`);
        }
        navigate("/");
    }
    return (
        <div>
            <Header />
            <Navigation />
            <h2>Add Exercise!</h2>
            <p>Example input: Name: Bicep Curl, Reps: 10, Weight: 30, Unit: lbs, Date: 07-02-25 (Date must be in MM-DD-YY Format)</p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        </td>

                        <td>
                            <input type="number" value={reps} onChange={e => setReps(e.target.value)} />
                        </td>

                        <td>
                            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                        </td>

                        <td>
                            <select value={unit} onChange={e => setUnit(e.target.value)}>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                            </select>
                        </td>

                        <td>
                            <input value={date} type="text" onChange={e => setDate(e.target.value)} />
                        </td>

                        <td>
                            <button onClick={onCreate}>
                                Save
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Footer />
        </div>
    )
}

export default Create;
