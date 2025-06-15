import { Link } from 'react-router-dom';
import '../App.css'
import React from 'react';

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
        </nav>
    )
}
export default Navigation;
