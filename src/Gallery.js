import React, { useState } from 'react'
import './styles/gallery.css'

const images = [
    // Board Members
    { id: 1, src: `${process.env.PUBLIC_URL}/gallery-images/board/board.webp`, category: 'Board Members', alt: 'The Board of Fall 2024' },
    { id: 2, src: `${process.env.PUBLIC_URL}/gallery-images/board/board-titans.webp`, category: 'Board Members', alt: 'The Board of Fall 2024' },
    { id: 3, src: `${process.env.PUBLIC_URL}/gallery-images/board/rayline.webp`, category: 'Board Members', alt: 'Rayline Perez | President' },
    { id: 4, src: `${process.env.PUBLIC_URL}/gallery-images/board/genaro.webp`, category: 'Board Members', alt: 'Genaro Lopez | Vice President' },
    { id: 5, src: `${process.env.PUBLIC_URL}/gallery-images/board/ericka.webp`, category: 'Board Members', alt: 'Ericka Martinez | Chief of Staff' },
    { id: 6, src: `${process.env.PUBLIC_URL}/gallery-images/board/simran.webp`, category: 'Board Members', alt: 'Simran Cheema | Chief of Staff' },
    { id: 7, src: `${process.env.PUBLIC_URL}/gallery-images/board/dan.webp`, category: 'Board Members', alt: 'Dan England | Director of Operations' },
    { id: 8, src: `${process.env.PUBLIC_URL}/gallery-images/board/enrique.webp`, category: 'Board Members', alt: 'Enrique Guerrero | Director of Finances' },
    { id: 9, src: `${process.env.PUBLIC_URL}/gallery-images/board/felix.jpg`, category: 'Board Members', alt: 'Felix Zhu | Director of Actives' },
    { id: 10, src: `${process.env.PUBLIC_URL}/gallery-images/board/frank.jpg`, category: 'Board Members', alt: 'Francisco Saldivar | Director of Alumni' },
    { id: 11, src: `${process.env.PUBLIC_URL}/gallery-images/board/shelby.webp`, category: 'Board Members', alt: 'Shelby Cantu | Director of Pledges' },
    { id: 12, src: `${process.env.PUBLIC_URL}/gallery-images/board/tom.webp`, category: 'Board Members', alt: 'Tom Forrest | Director of Marketing and Internal Affairs' },
    // Banquets
    { id: 13, src: `${process.env.PUBLIC_URL}/gallery-images/banquet1.jpg`, category: 'Banquets', alt: 'Caption here' },
    { id: 14, src: `${process.env.PUBLIC_URL}/gallery-images/banquet2.jpg`, category: 'Banquets', alt: 'Caption here' },
    { id: 15, src: `${process.env.PUBLIC_URL}/gallery-images/girls.jpg`, category: 'Banquets', alt: 'Caption here' },
    { id: 16, src: `${process.env.PUBLIC_URL}/gallery-images/girls2.jpg`, category: 'Banquets', alt: 'Caption here' },
    // Retreats
    { id: 18, src: `${process.env.PUBLIC_URL}/gallery-images/anthony-coke.jpg`, category: 'Retreats', alt: 'Caption here' },
]

function Gallery() {
    const [ selectedCategory, setSelectedCategory ] = useState( 'Board Members' );

    const categories = [ 'Board Members', 'Banquets', 'Retreats', 'Bid Dinner' ]

    const handleCategoryChange = ( category ) => {
        setSelectedCategory( category )
    }

    return (
        <div className='section' id='gallery-section'>
            <span className='section-title'>GALLERY</span>

            <div className='gallery-tabs'>
                { categories.map( ( category ) => (
                    <button
                        key={ category }
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
                        <div className={ `image-frame ${ isLandscape( image.src ) ? 'landscape' : 'portrait' }` } key={ image.id }>
                            <img
                                src={ image.src }
                                alt={ image.alt }
                                className='gallery-image'
                                loading="lazy"
                            />
                            <span className='image-caption'>{ image.alt }</span>
                        </div>
                    ))}
            </div>
        </div>
    )

    function isLandscape( src ) {
        const img = new Image()
        img.src = src
        return img.naturalWidth > img.naturalHeight     // True for landscape, false for portrait
    }
}

export default Gallery