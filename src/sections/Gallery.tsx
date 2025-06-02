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
}

export default function Gallery() {
	const [albums, setAlbums] = useState<string[]>([])
	const [images, setImages] = useState<ImageType[]>([])
	const [selectedAlbum, setSelectedAlbum] = useState<string>('')
	const [imageOrients, setImageOrients] = useState<Record<string, string>>({})

	useEffect(() => {
		const fetchGallery = async () => {
			// Fetch albums first
			const { data: albumsData, error: albumsError } = await supabase
				.from('albums')
				.select('id, name')
				.order('created_at', { ascending: true })

			if (albumsError) {
				console.error('Error fetching albums:', albumsError)
				return
			}

			const albumNames = albumsData?.map((album: AlbumType) => album.name) || []
			setAlbums(albumNames)
			// Select first album by default
			if (albumNames.length > 0 && !selectedAlbum) {
				setSelectedAlbum(albumNames[0])
			}

			// Fetch images with album relation
			const { data: imagesData, error: imagesError } = await supabase
				.from('images')
				.select('id, image_url, alt, title, orientation, album_id, albums (name)')
				.order('created_at', { ascending: true })

			if (imagesError) {
				console.error('Error fetching images:', imagesError)
				return
			}

			const mappedImages = imagesData?.map((img: any) => ({
				id: img.id,
				src: img.image_url,
				alt: img.alt,
				title: img.title || '',
				orientation: img.orientation,
				album_id: img.album_id,
				albumName: img.albums?.name || '',
			})) || []

			setImages(mappedImages)

			// Prepare orientation lookup
			const orientMap: Record<string, string> = {}
			mappedImages.forEach(img => {
				orientMap[img.id] = img.orientation
			})
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
				id="gallery"
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
					.filter(img => img.albumName === selectedAlbum)
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
							<span className="m-[0.25rem] text-center">{img.title}</span>
						</div>
					))}
			</div>
		</section>
	)
}
