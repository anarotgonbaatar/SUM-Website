import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Gallery() {
    const [selectedAlbum, setSelectedAlbum] = useState<string>('')
    const [images, setImages] = useState<any[]>([])
    const [imageOrients, setImageOrients] = useState<Record<string, string>>({})

    useEffect(() => {
        const fetchGallery = async () => {
            const { data, error } = await supabase
                .from('images')
                .select('id, image_url, title, album_id, orientation, albums!album_id ( name )')
                .order('order', { ascending: true })

            if (!error && data) {
                const mappedImages = data.map(img => ({
                    id: img.id,
                    src: img.image_url,
                    alt: img.title || '',
                    album: img.albums?.name || 'Uncategorized',
                    orientation: img.orientation
                }))

                setImages(mappedImages)

                // Set initial album
                if (mappedImages.length > 0 && !selectedAlbum) {
                    setSelectedAlbum(mappedImages[0].album)
                }

                // Load orientations
                const orients: Record<string, string> = {}
                for (const img of mappedImages) {
                    const i = new Image()
                    i.src = img.src
                    await i.decode()
                    orients[img.id] = i.naturalWidth > i.naturalHeight ? 'landscape' : 'portrait'
                }
                setImageOrients(orients)
            } else {
                console.error('Gallery fetch error:', error)
            }
        }

        fetchGallery()
    }, []) // ← run only once on mount

    const albums = [...new Set(images.map(img => img.album))]

    return (
        <section id="gallery-section" className="section bg-[white] text-[black]">
            <h2 className="section-title">GALLERY</h2>

            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-[0.25rem]">
                {albums.map(album => (
                    <button
                        key={album}
                        type="button"
                        onClick={() => setSelectedAlbum(album)}
                        className={`
                            rounded-t-[1rem]
                            p-[0.75rem] mb-[-1rem]
                            border-2 border-[var(--crimson)]
                            border-b-0
                            hover:bg-[var(--gold)]
                            cursor-pointer
                            mt-auto
                            ${
                                selectedAlbum === album
                                    ? 'bg-[var(--crimson-dark)] text-[var(--gold)] pb-[1.5rem]'
                                    : 'bg-transparent'
                            }
                        `}
                    >
                        {album.charAt(0).toUpperCase() + album.slice(1)}
                    </button>
                ))}
            </div>

            {/* Grid of Images */}
            <div
				id='gallery'
                className="
                    grid grid-cols-4
                    p-[0.75rem] gap-[0.75rem]
                    bg-[var(--crimson-dark)]
                    border-3 border-[var(--crimson)]
                    max-w-[60rem]
                    rounded-ss-[2rem] rounded-ee-[2rem]
                    shadow-[0_0_1rem_var(--shadow)]
                "
            >
                {images
                    .filter(img => img.album === selectedAlbum)
                    .map(img => (
                        <div
                            key={img.id}
                            className={`
								flex flex-col items-center
								bg-[var(--gold)] p-[0.25rem] rounded-ss-[1rem] rounded-ee-[1rem]
								hover:shadow-[0_0_1rem_var(--gold)]
                                ${imageOrients[img.id] === 'landscape' ? 'col-span-2' : 'col-span-1'}
                            `}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-auto object-cover border-4 border-[var(--gold-light)] rounded-ss-[0.75rem] rounded-ee-[0.75rem] mb-auto"
                                loading="lazy"
                            />
                            <span className="m-[0.25rem] text-center">{img.alt}</span>
                        </div>
                    ))}
            </div>
        </section>
    )
}