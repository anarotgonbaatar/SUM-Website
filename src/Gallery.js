import React, { useState } from 'react'
import './styles/gallery.css'

const images = [
    // Banquets
    { id: 5, src: `${process.env.PUBLIC_URL}/gallery-images/banquet1.jpg`, category: 'Banquets', alt: 'Anthony and his favorite drink' },
    { id: 6, src: `${process.env.PUBLIC_URL}/gallery-images/banquet2.jpg`, category: 'Banquets', alt: 'Anthony and his favorite drink' },
    { id: 1, src: `${process.env.PUBLIC_URL}/gallery-images/girls.jpg`, category: 'Banquets', alt: 'Anthony and his favorite drink' },
    { id: 2, src: `${process.env.PUBLIC_URL}/gallery-images/girls2.jpg`, category: 'Banquets', alt: 'Anthony and his favorite drink' },
    // Retreats
    { id: 3, src: `${process.env.PUBLIC_URL}/gallery-images/ericka-simran2.jpg`, category: 'Retreats', alt: 'Anthony and his favorite drink' },
    { id: 4, src: `${process.env.PUBLIC_URL}/gallery-images/anthony-coke.jpg`, category: 'Retreats', alt: 'Anthony and his favorite drink' },
    { id: 5, src: `${process.env.PUBLIC_URL}/gallery-images/banquet1.jpg`, category: 'Retreats', alt: 'Anthony and his favorite drink' },
    { id: 6, src: `${process.env.PUBLIC_URL}/gallery-images/banquet2.jpg`, category: 'Retreats', alt: 'Anthony and his favorite drink' },
    // Board Members
    { id: 1, src: `${process.env.PUBLIC_URL}/gallery-images/presidents.jpg`, category: 'Board Members', alt: 'Anthony and his favorite drink' },
    { id: 2, src: `${process.env.PUBLIC_URL}/gallery-images/ericka-simran.jpg`, category: 'Board Members', alt: 'Anthony and his favorite drink' },
    { id: 3, src: `${process.env.PUBLIC_URL}/gallery-images/ericka-simran2.jpg`, category: 'Board Members', alt: 'Anthony and his favorite drink' },
    { id: 4, src: `${process.env.PUBLIC_URL}/gallery-images/anthony-coke.jpg`, category: 'Board Members', alt: 'Anthony and his favorite drink' }
]

function Gallery() {
    const [ selectedCategory, setSelectedCategory ] = useState( 'Banquets' );

    const categories = [ 'Banquets', 'Retreats', 'Board Members' ]

    const handleCategoryChange = ( category ) => {
        setSelectedCategory( category )
    }

    return (
        <div className='section' id='gallery-section'>
            <span className='section-title'>GALLERY</span>

            <div className='gallery-tabs'>
                { categories.map( ( category ) => (
                    <button key={ category }
                        className={ `gallery-tab-btn ${ selectedCategory === category ? 'active' : ''}` }
                        onClick={ () => handleCategoryChange( category ) }
                    >
                        { category }
                    </button>
                ))}
            </div>

            {/* Images */}
            <div id='gallery'>
                { images
                    .filter( ( image ) => image.category === selectedCategory)
                    .map( ( image ) => (
                        <img key={ image.id } src={ image.src } alt={ image.alt } className='gallery-image'/>
                    ))}
            </div>
        </div>
    )
}

export default Gallery