import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Link } from 'react-router'
import { FaPencil } from 'react-icons/fa6'
import { FaTrashAlt } from 'react-icons/fa'

export default function StoryManager() {
    const [stories, setStories] = useState<any[]>([])
    const [form, setForm] = useState({
        name: '',
        quote: '',
        achievements: '',
        links: '',
        imageFile: null as File | null
    })
    const [editingId, setEditingId] = useState<string | null>(null)

    const fetchStories = async () => {
        const { data, error } = await supabase
            .from('stories')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error) {
            setStories(data || [])
        }
    }

    useEffect(() => {
        fetchStories()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (name === 'imageFile' && e.target instanceof HTMLInputElement && e.target.files) {
            setForm({ ...form, imageFile: e.target.files[0] })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const uploadImage = async (file: File) => {
        const fileName = `${Date.now()}_${file.name}`

        const { error: uploadError } = await supabase.storage.from('gallery').upload(`stories/${fileName}`, file)

        if (uploadError) {
            console.error('Upload error:', uploadError)
            return ''
        }

        const { data } = supabase.storage.from('gallery').getPublicUrl(`stories/${fileName}`)

        return data.publicUrl
    }

    const handleAdd = async () => {
        let imageUrl = ''

        if (form.imageFile) {
            imageUrl = await uploadImage(form.imageFile)
        }

        const payload = {
            name: form.name,
            quote: form.quote,
            achievements: form.achievements.split('\n'),
            links: form.links
                .split('\n')
                .filter(Boolean)
                .map(link => ({ href: link, iconName: 'FaLink' })),
            image_url: imageUrl
        }

        await supabase.from('stories').insert(payload)

        setForm({ name: '', quote: '', achievements: '', links: '', imageFile: null })
        fetchStories()
    }

    const handleEdit = (story: any) => {
        setEditingId(story.id)
        setForm({
            name: story.name,
            quote: story.quote,
            achievements: (story.achievements ?? []).join('\n'),
            links: (story.links ?? []).map((link: any) => link.href).join('\n'),
            imageFile: null
        })
    }

    const handleSave = async () => {
        let imageUrl = ''

        if (form.imageFile) {
            imageUrl = await uploadImage(form.imageFile)
        }

        const payload: any = {
            name: form.name,
            quote: form.quote,
            achievements: form.achievements.split('\n'),
            links: form.links
                .split('\n')
                .filter(Boolean)
                .map(link => ({ href: link, iconName: 'FaLink' })),
        }

        if (imageUrl) {
            payload.image_url = imageUrl
        }

        await supabase.from('stories').update(payload).eq('id', editingId)

        setEditingId(null)
        setForm({ name: '', quote: '', achievements: '', links: '', imageFile: null })
        fetchStories()
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this story?')) return

        await supabase.from('stories').delete().eq('id', id)

        fetchStories()
    }

    const handleCancel = () => {
        setEditingId(null)
        setForm({ name: '', quote: '', achievements: '', links: '', imageFile: null })
    }

    return (
        <div className="dashboard-section">
            
			<h3 className="dashboard-title">Stories Manager</h3>
			
			<button className='btn' type='button' title='Back to Dashboard'>
				<Link
					to="/admin/dashboard"
					className="text-[black]"
				>
					← Back to Dashboard
				</Link>
			</button>

            {/* ADD NEW STORY */}
            <span className="dashboard-header">Add New Story</span>
            
			<div className="dashboard-container">
                <label>
                    Full Name
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        title="Full Name"
                        placeholder="Enter full name"
                    />
                </label>
                <label>
                    Quote
                    <textarea
                        name="quote"
                        value={form.quote}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        title="Quote"
                        placeholder="Include quotation marks"
                    />
                </label>
                <label>
                    Upload Image
                    <input
                        type="file"
                        name="imageFile"
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        title="Upload Image"
                    />
                </label>
                <label>
                    Achievements (one per line)
                    <textarea
                        name="achievements"
                        value={form.achievements}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        title="Achievements"
                        placeholder="Enter achievements, one per line"
                    />
                </label>
                <label>
                    Links (one per line)
                    <textarea
                        name="links"
                        value={form.links}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        title="Links"
                        placeholder="Enter links, one per line"
                    />
                </label>
                <button onClick={handleAdd} className="btn" type='button' title='Add Story'>
					Add Story
				</button>
            </div>

            {/* EXISTING STORIES */}
			<span className='dashboard-header'>Existing Stories</span>
            
			<ul className="dashboard-container">
                {stories.map(story => (
                    <li key={story.id}
						className="dashboard-li"
					>
                        <div className="flex gap-[0.5rem] items-center">
                            <img
                                src={story.image_url}
                                alt={story.name}
                                className="w-20 h-20 object-cover"
                            />
                            <div>
                                <div className="font-[600] text-[1.25rem]">{story.name}</div>
                                <div className="italic text-[var(--gold-light)]">{story.quote}</div>
                            </div>
                        </div>

                        <div>
                            <span className='font-[600] border-t-1'>Achievements:</span>
                            <ul className="list-disc ml-5">
                                {(story.achievements ?? []).map((a: string, idx: number) => (
                                    <li key={idx} className='ml-[1.5rem]'>{a}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <span className='font-[600] border-t-1'>Links:</span>
                            <ul className="list-disc ml-5">
                                {(story.links ?? []).map((link: any, idx: number) => (
                                    <li key={idx}  className='ml-[1.5rem]'>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] underline">
                                            {link.href}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {editingId === story.id ? (
                            <div className="flex flex-col gap-[0.5rem] bg-[var(--crimson-dark)] p-[0.5rem]">
                                <span className='text-[1.25rem] font-[600] text-[var(--gold-light)]'>Editing...</span>
								<label>
                                    Full Name
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="border p-2 rounded w-full"
                                        title="Full Name"
                                        placeholder="Enter full name"
                                    />
                                </label>
                                <label>
                                    Quote
                                    <textarea
                                        name="quote"
                                        value={form.quote}
                                        onChange={handleChange}
                                        className="border p-2 rounded w-full"
                                        title="Quote"
                                        placeholder="Enter quote"
                                    />
                                </label>
                                <label>
                                    Upload Image
                                    <input
                                        type="file"
                                        name="imageFile"
                                        onChange={handleChange}
                                        className="border p-2 rounded w-full"
                                        title="Upload Image"
                                    />
                                </label>
                                <label>
                                    Achievements (one per line)
                                    <textarea
                                        name="achievements"
                                        value={form.achievements}
                                        onChange={handleChange}
                                        className="border p-2 rounded w-full"
                                        title="Achievements"
                                        placeholder="Enter achievements, one per line"
                                    />
                                </label>
                                <label>
                                    Links (one per line)
                                    <textarea
                                        name="links"
                                        value={form.links}
                                        onChange={handleChange}
                                        className="border p-2 rounded w-full"
                                        title="Links"
                                        placeholder="Enter links, one per line"
                                    />
                                </label>

                                <div className="flex justify-between">
                                    <button onClick={handleSave} className="btn" type='button' title='Save Story'>
										Save
									</button>
                                    <button onClick={handleCancel} className="btn" type='button' title='Cancel Edit'>
										Cancel
									</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between">
                                <button onClick={() => handleEdit(story)} className="btn" type='button' title='Edit Story'>
									<FaPencil/>
								</button>
                                <button onClick={() => handleDelete(story.id)} className="btn" type='button' title='Delete Story'>
									<FaTrashAlt/>
								</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
