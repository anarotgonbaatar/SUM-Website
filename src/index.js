import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Stories from './Stories';
import Mission from './Mission';
import Gallery from './Gallery';
// import Testimonials from './Testimonials';
import Events from './Events';
import Footer from './Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Navbar />
        <Home />
        <About />
        <Stories />
        <Mission />
        <Gallery />
        {/* <Testimonials /> */}
        <Events />
        <Footer />
    </React.StrictMode>
);
