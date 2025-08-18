import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Link } from 'react-router'
import heic2any from 'heic2any'
import { FaTrashAlt, FaAngleDown, FaAngleUp, FaCheck, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa'

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
            .order('order', { ascending: true, nullsFirst: false })

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

		const maxOrder = Math.max(0, ...albums.map(a => a.order || 0))
        await supabase.from('albums').insert({ name: albumName, slug, order: maxOrder + 1 })

        setAlbumName('')
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

	const moveAlbum = async (albumId: string, direction: 'up' | 'down') => {
        const sorted = [...albums].sort((a, b) => (a.order || 0) - (b.order || 0))
        const index = sorted.findIndex(a => a.id === albumId)
        if (index === -1) return
        const swapWithIndex = direction === 'up' ? index - 1 : index + 1
        if (swapWithIndex < 0 || swapWithIndex >= sorted.length) return
        const current = sorted[index]
        const swap = sorted[swapWithIndex]
        await supabase.from('albums').update({ order: swap.order }).eq('id', current.id)
        await supabase.from('albums').update({ order: current.order }).eq('id', swap.id)
        fetchAlbums()
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

    // Swap image order by typing a number (atomic via RPC)
	const setImageOrder = async (albumId: string, imageId: string, newOrderRaw: number | string) => {
		const newOrder = Number(newOrderRaw)
		if (!Number.isInteger(newOrder) || newOrder < 0) return
		const { error } = await supabase.rpc('swap_image_order', {
			_image_id: imageId,
			_album_id: albumId,
			_new_order: newOrder
		})
		if (!error) {
			await fetchImages()
		} else {
			alert('Could not set order: ' + error.message)
		}
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
								<button onClick={() => moveAlbum(album.id, 'up')} className="btn" title='Move Album Up'>
                                    <FaArrowUp/>
                                </button>
                                <button onClick={() => moveAlbum(album.id, 'down')} className="btn" title='Move Album Down'>
                                    <FaArrowDown/>
								</button>
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

                                {/* IMAGES/VIDEOS IN THIS ALBUM (Horizontal row, album-only x-scroll) */}
								<div className="overflow-x-auto no-scrollbar">
								<div className="flex gap-[0.5rem] pr-[0.5rem]">
									{images
										.filter(img => img.album_id === album.id)
										.sort((a, b) => (a.order || 0) - (b.order || 0))
										.map(img => (
											<div
												key={img.id}
												className="flex-none w-[12rem] bg-[black] rounded-ss-[0.5rem] rounded-ee-[0.5rem] overflow-hidden gap-[0.25rem] flex flex-col p-[0.25rem]"
												title={`Current order: ${img.order ?? 0}`}
											>
												{img.media_type === 'video' ? (
													<video src={img.image_url} controls className="w-full h-[9rem] object-cover" />
												) : (
													<img src={img.image_url} alt={img.alt} className="object-cover w-full" />
												)}

												{/* Title edit row (unchanged) */}
												<div className="flex gap-[0.25rem]">
													<input
														type="text"
														value={titleEdits[img.id] ?? img.title ?? ''}
														onChange={e => setTitleEdits(prev => ({ ...prev, [img.id]: e.target.value }))}
														placeholder="Enter title"
														className="text-center flex-1"
													/>
													<button onClick={() => handleSaveTitle(img.id)} className="btn w-[3rem]" title="Save Title">
														<FaCheck/>
													</button>
												</div>

												{/* Order + Delete row */}
												<div className="flex items-center justify-between gap-[0.25rem]">
													<div className="flex items-center gap-[0.25rem]">
													<span className="text-xs opacity-80">Order</span>
													<input
														type="number"
														min={0}
														defaultValue={img.order ?? 0}
														className="input !px-2 !py-1 w-[4.5rem]"
														onKeyDown={(e) => {
														if (e.key === 'Enter') {
															const val = (e.target as HTMLInputElement).value
															setImageOrder(album.id, img.id, val)
															;(e.target as HTMLInputElement).blur()
														}
														}}
														onBlur={(e) => setImageOrder(album.id, img.id, (e.target as HTMLInputElement).value)}
														title="Type a number; if taken, images will swap"
													/>
													</div>

													<button onClick={() => handleDeleteImage(img.id)} className="btn" title="Delete Image">
														<FaTrash/>
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
