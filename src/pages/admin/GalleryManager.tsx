import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Link } from 'react-router'
import heic2any from 'heic2any'
import { FaTrashAlt, FaAngleDown, FaAngleUp, FaCheck, FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa'

export default function GalleryManager() {
    const [albums, setAlbums] = useState<any[]>([])
    const [images, setImages] = useState<any[]>([])
    const [expandedAlbums, setExpandedAlbums] = useState<string[]>([])
    const [albumName, setAlbumName] = useState('')
	const [titleEdits, setTitleEdits] = useState<{ [key: string]: string }>({})


    const fetchAlbums = async () => {
        const { data, error } = await supabase
            .from('albums')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error) {
            setAlbums(data || [])
        }
    }

    const fetchImages = async () => {
        const { data, error } = await supabase
            .from('images')
            .select('*')
            .order('order', { ascending: true })

        if (!error) {
            setImages(data || [])
        }
    }

    useEffect(() => {
        fetchAlbums()
        fetchImages()
    }, [])

    const toggleAlbum = (albumId: string) => {
        setExpandedAlbums(prev =>
            prev.includes(albumId)
                ? prev.filter(id => id !== albumId)
                : [...prev, albumId]
        )
    }

    const handleAddAlbum = async () => {
        if (!albumName) return

        const slug = albumName.toLowerCase().replace(/\s+/g, '-')

        await supabase.from('albums').insert({ name: albumName, slug })

        setAlbumName('')
        fetchAlbums()
    }

    const handleDeleteAlbum = async (id: string) => {
        if (!confirm('Are you sure you want to delete this album? All images in it will also be removed.')) return

        await supabase.from('albums').delete().eq('id', id)
        await supabase.from('images').delete().eq('album_id', id)

        fetchAlbums()
        fetchImages()
    }

    const convertToWebP = async (file: File) => {
		let sourceFile = file

		// If HEIC, convert first to PNG
		if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
			console.log('Converting HEIC...')
			const blob = await heic2any({ blob: file, toType: 'image/png' }) as Blob
			sourceFile = new File([blob], file.name.replace(/\.heic$/, '.png'), { type: 'image/png' })
		}

		// Now convert to WebP
		const imageBitmap = await createImageBitmap(sourceFile)
		const canvas = document.createElement('canvas')
		canvas.width = imageBitmap.width
		canvas.height = imageBitmap.height
		const ctx = canvas.getContext('2d')
		ctx?.drawImage(imageBitmap, 0, 0)

		return new Promise<File>((resolve) => {
			canvas.toBlob((blob) => {
				if (blob) {
					resolve(new File([blob], sourceFile.name.replace(/\.[^/.]+$/, '.webp'), { type: 'image/webp' }))
				}
			}, 'image/webp')
		})
	}

    const handleUploadMedia = async (albumId: string, file: File) => {
		let uploadFile = file
		let mediaType = 'image'

		const isImage = file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.heic')
		const isVideo = file.type.startsWith('video/')

		if (isImage) {
			uploadFile = await convertToWebP(file)
			mediaType = 'image'
		} else if (isVideo) {
			mediaType = 'video'
		} else {
			alert(`Unsupported file type: ${file.type} (${file.name})`)
			return
		}

		const fileName = `${Date.now()}_${uploadFile.name}`

		const { error: uploadError } = await supabase.storage.from('gallery').upload(`albums/${fileName}`, uploadFile)

		if (uploadError) {
			console.error('Upload error:', uploadError)
			return
		}

		const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(`albums/${fileName}`)

		const maxOrder = Math.max(
			0,
			...images.filter(img => img.album_id === albumId).map(img => img.order || 0)
		)

		await supabase.from('images').insert({
			album_id: albumId,
			image_url: urlData.publicUrl,
			alt: file.name,
			orientation: 'landscape',
			order: maxOrder + 1,
			media_type: mediaType,
			title: ''
		});


		fetchImages()
	}

    const handleDeleteImage = async (imageId: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return

        await supabase.from('images').delete().eq('id', imageId)

        fetchImages()
    }

    const moveImage = async (albumId: string, imageId: string, direction: 'left' | 'right') => {
        const albumImages = images
            .filter(img => img.album_id === albumId)
            .sort((a, b) => (a.order || 0) - (b.order || 0))

        const index = albumImages.findIndex(img => img.id === imageId)
        if (index === -1) return

        const swapWithIndex = direction === 'left' ? index - 1 : index + 1
        if (swapWithIndex < 0 || swapWithIndex >= albumImages.length) return

        const currentImage = albumImages[index]
        const swapImage = albumImages[swapWithIndex]

        await supabase.from('images').update({ order: swapImage.order }).eq('id', currentImage.id)
        await supabase.from('images').update({ order: currentImage.order }).eq('id', swapImage.id)

        fetchImages()
    }

	const handleSaveTitle = async (imageId: string) => {
		const newTitle = titleEdits[imageId] ?? '';
		await supabase.from('images').update({ title: newTitle }).eq('id', imageId);
		fetchImages();
	};


    return (
        <div className="dashboard-section">
			
			<h3 className="dashboard-title">Gallery Manager</h3>

			<button className='btn' title='Back to Dashboard'>
				<Link
					to="/admin/dashboard"
					className="text-[black]"
				>
					← Back to Dashboard
				</Link>
			</button>

            {/* ADD NEW ALBUM */}
			<span className='dashboard-header'>Add New Album</span>

            <div className="dashboard-container">
                <label className="w-full">
					New Album Name
                    <input
                        value={albumName}
                        onChange={e => setAlbumName(e.target.value)}
                        title="Album Name"
                        placeholder="Enter album name"
                    />
                </label>
                <button onClick={handleAddAlbum} className="btn" title='Add New Album'>
					Add Album
				</button>
            </div>

            {/* ALBUMS LIST */}
			<span className='dashboard-header'>Existing Albums</span>
            
			<ul className="dashboard-container">
                {albums.map(album => (
                    <li
                        key={album.id}
                        className="dashboard-li"
                    >
						{/* Album Header Section */}
                        <div className="flex justify-between items-center">
                            <div className="text-[1.25rem]">{album.name}</div>
                            <div className="flex gap-[0.5rem]">
                                <button onClick={() => toggleAlbum(album.id)} className="btn" title='Toggle Album Details'>
                                    {expandedAlbums.includes(album.id) ? <FaAngleUp/> : <FaAngleDown/>}
                                </button>
                                <button onClick={() => handleDeleteAlbum(album.id)} className="btn" title='Delete Album'>
									<FaTrashAlt/>
								</button>
                            </div>
                        </div>

                        {expandedAlbums.includes(album.id) && (
                            <div className="flex flex-col gap-[0.75rem]">
                                <label className="">
                                    Upload Image/Video
                                    <input
                                        type="file"
                                        accept="image/*,video/*,.heic"
										multiple
                                        onChange={async e => {
                                            if (e.target.files) {
                                                await Promise.all(Array.from(e.target.files).map(file => {
													handleUploadMedia(album.id, file)
												}))
                                            }
                                        }}
                                        title="Upload Media"
                                    />
                                </label>

                                {/* IMAGES/VIDEOS IN THIS ALBUM */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-[0.5rem]">
                                    {images
                                        .filter(img => img.album_id === album.id)
                                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                                        .map(img => (
                                            <div key={img.id} className="bg-[black] rounded-ss-[0.5rem] rounded-ee-[0.5rem] overflow-hidden gap-[0.25rem] flex flex-col p-[0.25rem]">
                                                {img.media_type === 'video' ? (
                                                    <video src={img.image_url} controls className="w-full h-auto object-cover" />
                                                ) : (
                                                    <img src={img.image_url} alt={img.alt} className="object-cover w-full h-auto my-auto" />
                                                )}
												<div className="flex gap-[0.25rem]">
													<input
														type="text"
														value={titleEdits[img.id] ?? img.title ?? ''}
														onChange={e => setTitleEdits(prev => ({ ...prev, [img.id]: e.target.value }))}
														placeholder="Enter title"
														className="text-center"
													/>
													<button
														onClick={() => handleSaveTitle(img.id)}
														className="btn w-full"
														 title='Save Title'
													>
														<FaCheck/>
													</button>
												</div>
                                                <div className="flex justify-between">
                                                    <button onClick={() => moveImage(album.id, img.id, 'left')} className="btn" title='Reorder Left'>
														<FaAngleLeft/>
													</button>
                                                    <button onClick={() => moveImage(album.id, img.id, 'right')} className="btn" title='Reorder Right'>
														<FaAngleRight/>
													</button>
                                                    <button onClick={() => handleDeleteImage(img.id)} className="btn" title='Delete Image'>
														<FaTrash/>
													</button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
