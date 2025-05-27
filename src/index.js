import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/index.css';
// Sections
import Navbar from './Navbar';
import Chatbot from './chatbot';
import Home from './sections/Home';
import About from './sections/About';
import Stories from './sections/Stories';
import Mission from './sections/Mission';
import Gallery from './sections/Gallery';
import Events from './sections/Events';
import Footer from './sections/Footer';
import Auth from './Auth'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
			<Navbar />
			<Chatbot />
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/auth' element={<Auth/>}/>
			</Routes>
			<About />
			<Stories />
			<Mission />
			<Gallery />
			<Events />
			<Footer />
		</Router>
    </React.StrictMode>
);
