import React, { useState, useEffect } from 'react'
import './styles/gallery.css'
import { IoClose } from "react-icons/io5";

const images = [
    // Board Members
    { id: 1, src: `${process.env.PUBLIC_URL}/gallery-images/board/board.webp`, category: 'Board Members', alt: 'The Board of Fall 2024' },
    { id: 2, src: `${process.env.PUBLIC_URL}/gallery-images/board/board-titans.webp`, category: 'Board Members', alt: 'The Board of Fall 2024' },
    { id: 3, src: `${process.env.PUBLIC_URL}/gallery-images/board/rayline.webp`, category: 'Board Members', alt: 'Rayline Perez | President' },
    { id: 4, src: `${process.env.PUBLIC_URL}/gallery-images/board/genaro.webp`, category: 'Board Members', alt: 'Genaro Lopez | Vice President' },
    { id: 5, src: `${process.env.PUBLIC_URL}/gallery-images/board/ericka.webp`, category: 'Board Members', alt: 'Ericka Martinez | Chief of Staff' },
    { id: 6, src: `${process.env.PUBLIC_URL}/gallery-images/board/simran.webp`, category: 'Board Members', alt: 'Simran Cheema | Chief of Staff' },
    { id: 7, src: `${process.env.PUBLIC_URL}/gallery-images/board/klarissa.jpg`, category: 'Board Members', alt: 'Klarissa Gunter | Director of Operations' },
    { id: 8, src: `${process.env.PUBLIC_URL}/gallery-images/board/enrique.webp`, category: 'Board Members', alt: 'Enrique Guerrero | Director of Finances' },
    { id: 9, src: `${process.env.PUBLIC_URL}/gallery-images/board/elena.jpg`, category: 'Board Members', alt: 'Elena Vilchis | Director of Actives' },
    { id: 10, src: `${process.env.PUBLIC_URL}/gallery-images/board/anar.jpg`, category: 'Board Members', alt: 'Anar Otgonbaatar | Director of Alumni' },
    { id: 11, src: `${process.env.PUBLIC_URL}/gallery-images/board/marcel.jpg`, category: 'Board Members', alt: 'Marcel Marable | Director of Pledges' },
    { id: 12, src: `${process.env.PUBLIC_URL}/gallery-images/board/manveer.jpg`, category: 'Board Members', alt: 'Manveer Kaur Cheema | Director of Marketing' },
    { id: 13, src: `${process.env.PUBLIC_URL}/gallery-images/board/arik.jpg`, category: 'Board Members', alt: 'Arik Lieu | Director of BICC' },
    // Banquets
    { id: 14, src: `${process.env.PUBLIC_URL}/gallery-images/banquet/banquet1.jpg`, category: 'Banquets', alt: 'Spring 2023' },
    { id: 15, src: `${process.env.PUBLIC_URL}/gallery-images/banquet/banquet2.jpg`, category: 'Banquets', alt: 'Spring 2023' },
    { id: 16, src: `${process.env.PUBLIC_URL}/gallery-images/banquet/girls.jpg`, category: 'Banquets', alt: 'Fall 2024' },
    { id: 17, src: `${process.env.PUBLIC_URL}/gallery-images/banquet/girls2.jpg`, category: 'Banquets', alt: 'Fall 2024' },
    { id: 18, src: `${process.env.PUBLIC_URL}/gallery-images/banquet/ericka-simran2.jpg`, category: 'Banquets', alt: 'Chief of Staffs' },
    { id: 19, src: `${process.env.PUBLIC_URL}/gallery-images/banquet/presidents.jpg`, category: 'Banquets', alt: 'Presidents' },
    { id: 20, src: `${process.env.PUBLIC_URL}/gallery-images/banquet/couples.jpg`, category: 'Banquets', alt: '<3>' },
    { id: 21, src: `${process.env.PUBLIC_URL}/gallery-images/banquet/los-maestros.jpg`, category: 'Banquets', alt: 'Los Maestros' },
    // Retreats
    { id: 22, src: `${process.env.PUBLIC_URL}/gallery-images/retreat/Friendsgiving Fall 2023.JPG`, category: 'Retreats', alt: 'Friendsgiving Fall 2023' },
    { id: 23, src: `${process.env.PUBLIC_URL}/gallery-images/retreat/Fall 2023.jpg`, category: 'Retreats', alt: 'Fall 2023' },
    { id: 24, src: `${process.env.PUBLIC_URL}/gallery-images/retreat/Family Olympics Spring 2024.jpg`, category: 'Retreats', alt: 'Family Olympics Spring 2024' },
    // Bid Dinners
    { id: 25, src: `${process.env.PUBLIC_URL}/gallery-images/bid dinner/Dark Horses.JPG`, category: 'Bid Dinner', alt: 'Dark Horses Fall 2023' },
    { id: 26, src: `${process.env.PUBLIC_URL}/gallery-images/bid dinner/Fall 2024.JPG`, category: 'Bid Dinner', alt: 'Fall 2024' },
]

function Gallery() {
    const [ selectedCategory, setSelectedCategory ] = useState( 'Board Members' );
    const [ imageOrients, setImageOrients ] = useState({})   // Store image orientations
    const [ zoomedImage, setZoomedImage ] = useState( null )

    useEffect( () => {
        // Preload images and get orientations
        const getImageOrients = async () => {
            const orients = {}
            for ( const image of images ) {
                const img = new Image()
                img.src = image.src
                await img.decode()  // Ensure image is fully loaded
                orients[ image.id ] = img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait'
            }
            setImageOrients( orients )
        }
        getImageOrients()
    }, [])

    const categories = [ 'Board Members', 'Banquets', 'Retreats', 'Bid Dinner' ]

    const handleCategoryChange = ( category ) => {
        setSelectedCategory( category )
    }

    const handleImageClick = ( image ) => {
        setZoomedImage( image )
    }
    const closeZoom = () => {
        setZoomedImage( null )
    }

    return (
        <div className='section' id='gallery-section'>
            <span className='section-title'>GALLERY</span>

            <div className='gallery-tabs'>
                { categories.map( ( category ) => (
                    <button
                        key={ category }
                        className={ `gallery-tab-btn ${ selectedCategory === category ? 'active' : '' }` }
                        onClick={ () => handleCategoryChange( category ) }
                    >
                        { category }
                    </button>
                ))}
            </div>

            {/* Images */}
            <div id='gallery'>
                { images
                    .filter( ( image ) => image.category === selectedCategory )
                    .map( ( image ) => (
                        <div
                            className={ `image-frame ${ imageOrients[ image.id ] || '' }` }
                            key={ image.id }
                            onClick={ () => handleImageClick( image ) }
                        >
                            <img
                                src={ image.src }
                                alt={ image.alt }
                                className='gallery-image'
                                loading="lazy"
                            />
                            <span className='image-caption'>{ image.alt }</span>
                        </div>
                    ))
                }
            </div>

            {/* Zoom on images */}
            { zoomedImage && (
                <div className='zoom-modal' onClick={ closeZoom }>
                    <div className='zoom-modal-content' onClick={ (e) => e.stopPropagation() }>
                        <img
                            src={ zoomedImage.src }
                            alt={ zoomedImage.alt }
                            className='zoomed-image'
                        />
                        <span className='close-modal-btn' onClick={ closeZoom }>
                            <IoClose className='icon' id='close-btn'/>
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Gallery