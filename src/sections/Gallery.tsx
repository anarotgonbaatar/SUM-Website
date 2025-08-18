import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface AlbumType {
  id: string
  name: string
}

interface ImageType {
  id: string
  src: string
  alt: string
  title: string
  orientation: string
  album_id: string
  albumName: string
  order: number | null   // ← added
}

export default function Gallery() {
  const [albums, setAlbums] = useState<string[]>([])
  const [images, setImages] = useState<ImageType[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<string>('')
  const [imageOrients, setImageOrients] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchGallery = async () => {
      // Albums ordered by albums.order
      const { data: albumsData, error: albumsError } = await supabase
        .from('albums')
        .select('id, name, order')
        .order('order', { ascending: true, nullsFirst: false })

      if (albumsError) {
        console.error('Error fetching albums:', albumsError)
        return
      }

      const albumNames = (albumsData || []).map((a: AlbumType) => a.name)
      setAlbums(albumNames)
      if (albumNames.length > 0 && !selectedAlbum) setSelectedAlbum(albumNames[0])

      // Images ordered by images.order (global order—filtered per album below)
      const { data: imagesData, error: imagesError } = await supabase
        .from('images')
        .select('id, image_url, alt, title, orientation, album_id, order, albums (name)')
        .order('order', { ascending: true, nullsFirst: false })

      if (imagesError) {
        console.error('Error fetching images:', imagesError)
        return
      }

      const mappedImages: ImageType[] = (imagesData || []).map((img: any) => ({
        id: img.id,
        src: img.image_url,
        alt: img.alt,
        title: img.title || '',
        orientation: img.orientation,
        album_id: img.album_id,
        albumName: img.albums?.name || '',
        order: img.order ?? null, // ← keep order
      }))

      setImages(mappedImages)

      // Orientation lookup (unchanged)
      const orientMap: Record<string, string> = {}
      mappedImages.forEach(img => { orientMap[img.id] = img.orientation })
      setImageOrients(orientMap)
    }

    fetchGallery()
  }, [selectedAlbum])

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
              ${selectedAlbum === album
                ? 'bg-[var(--crimson-dark)] text-[var(--gold)] pb-[1.5rem]'
                : 'bg-transparent'}
            `}
          >
            {album.charAt(0).toUpperCase() + album.slice(1)}
          </button>
        ))}
      </div>

      {/* Horizontal row of images (album-only x-scroll) */}
      <div
        id="gallery"
        className="
          p-[0.75rem] gap-[0.75rem]
          bg-[var(--crimson-dark)]
          border-3 border-[var(--crimson)]
          max-w-[60rem]
          rounded-ss-[2rem] rounded-ee-[2rem]
          shadow-[0_0_1rem_var(--shadow)]
          overflow-x-auto no-scrollbar
        "
      >
        <div className="flex items-stretch gap-[0.75rem] pr-[0.75rem]">
          {images
            .filter(img => img.albumName === selectedAlbum)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) // ensure DB order is honored
            .map(img => (
              <figure
                key={img.id}
                className={`
                  flex-none
                  bg-[var(--gold)] p-[0.25rem] rounded-ss-[1rem] rounded-ee-[1rem]
                  hover:shadow-[0_0_1rem_var(--gold)]
                  ${imageOrients[img.id] === 'landscape' ? 'w-[20rem]' : 'w-[12rem]'}
                `}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover border-4 border-[var(--gold-light)] rounded-ss-[0.75rem] rounded-ee-[0.75rem]"
                  loading="lazy"
                />
                {img.title && <figcaption className="m-[0.25rem] text-center">{img.title}</figcaption>}
              </figure>
            ))}
        </div>
      </div>
    </section>
  )
}
