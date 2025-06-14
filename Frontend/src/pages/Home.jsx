import Navigation from '../components/Navigation'
import Table from '../components/Table'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Home({setExerciseToEdit}) {
    const navigate = useNavigate();
    const [exercises, setExercise] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const loadExercises = async() => {
      const response = await fetch(`${backendUrl}/exercises`)
      const data = await response.json();
      setExercise(data)
    }
    useEffect( () => {
        loadExercises();
    }, [])

    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        navigate("/edit");
    }
    return (
        <div>
            <Header />
            <Navigation />
            <Table exercises={exercises} setExercise={setExercise} onEdit={onEdit} />
            <Footer />
        </div>
    )
}

export default Home;
