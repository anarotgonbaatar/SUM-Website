import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Link } from 'react-router'
import { FaTrashAlt } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

export default function EventsManager() {
    const [events, setEvents] = useState<any[]>([])
    const [form, setForm] = useState({
        name: '',
        date: '',
        description: '',
        time: '',
        location: ''
    })
	const [message, setMessage] = useState<string>('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState({
        name: '',
        date: '',
        description: '',
        time: '',
        location: ''
    })

    const fetchEvents = async () => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true })

        if (!error) {
            setEvents(data || [])
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const handleAdd = async () => {
		setMessage('')
		
		console.log('FORM DEBUG:', form)

        if (
			!form.name.trim() ||
			(!form.date && form.date !== 'TBD') ||
			!form.description.trim() ||
			!form.time.trim() ||
			!form.location.trim()
		) {
			setMessage('Please fill in all fields.')
			return
		}

        const { error } = await supabase.from('events').insert({
            name: form.name,
            date: form.date === 'TBD' ? null : form.date,
            description: form.description,
            time: form.time,
            location: form.location
        })

		if (error) {
			console.error('Error adding event:', error)
			setMessage('Error adding event. Please try again.')
		} else {
			setMessage('Event added successfully!')
			setForm({ name: '', date: '', description: '', time: '', location: '' })
			fetchEvents()
		}

    }

    const handleEdit = (event: any) => {
        setEditingId(event.id)
        setEditForm({
            name: event.name,
            date: event.date,
            description: event.description,
            time: event.time,
            location: event.location
        })
    }

    const handleSave = async () => {
        if (!editForm.name || !editForm.date || !editForm.description || !editForm.time || !editForm.location) return

        await supabase
            .from('events')
            .update({
                name: editForm.name,
                date: editForm.date,
                description: editForm.description,
                time: editForm.time,
                location: editForm.location
            })
            .eq('id', editingId)

        setEditingId(null)
        setEditForm({ name: '', date: '', description: '', time: '', location: '' })
        fetchEvents()
    }

    const handleCancel = () => {
        setEditingId(null)
        setEditForm({ name: '', date: '', description: '', time: '', location: '' })
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return

        await supabase.from('events').delete().eq('id', id)
        fetchEvents()
    }

    return (
        <div className="dashboard-section">
            <h3 className="dashboard-title">Events Manager</h3>

			<button className='btn'  type='button' title='Back to Dashboard'>
				<Link
					to="/admin/dashboard"
					className="text-[black]"
				>
					← Back to Dashboard
				</Link>
			</button>

            {/* ADD NEW EVENT */}
			<span className='dashboard-header'>Add New Event</span>
            <div className="dashboard-container">
                <label>
                    Event Name
                    <input
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="border p-2 rounded w-full"
                        title="Event Name"
                        placeholder="Enter event name"
                    />
                </label>
                <label>
					<div className="flex items-center justify-between">
						<span>Date</span>
						<label className="flex gap-[0.25rem] items-center">
							<input
								type="checkbox"
								checked={form.date === 'TBD'}
								onChange={e =>
									setForm({ ...form, date: e.target.checked ? 'TBD' : '' })
								}
								className="cursor-pointer w-[1rem] shadow-none!"
							/>
							TBD
						</label>
					</div>

					{form.date === 'TBD' ? null : (
						<input
							type="date"
							value={form.date}
							onChange={e => setForm({ ...form, date: e.target.value })}
							className="border p-2 rounded w-full"
							title="Event Date"
						/>
					)}
				</label>
                <label>
                    Description
                    <textarea
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        className="border p-2 rounded w-full"
                        title="Event Description"
                        placeholder="Enter event description"
                    />
                </label>
                <label>
                    Time
                    <input
                        value={form.time}
                        onChange={e => setForm({ ...form, time: e.target.value })}
                        className="border p-2 rounded w-full"
                        title="Event Time"
                        placeholder="e.g. 6:00 PM"
                    />
                </label>
                <label>
                    Location
                    <input
                        value={form.location}
                        onChange={e => setForm({ ...form, location: e.target.value })}
                        className="border p-2 rounded w-full"
                        title="Event Location"
                        placeholder="Enter event location"
                    />
                </label>
                <div className='flex gap-[0.5rem]'>
					<button onClick={handleAdd} className="btn" type='button' title='Add Event'>
						Add Event
					</button>
					<span className='text-wrap'>{ message }</span>
				</div>
            </div>

            {/* EVENTS LIST */}
			<span className='dashboard-header'>Existing Events</span>
            <ul className="dashboard-container">
                {events.map(event => (
                    <li
                        key={event.id}
                        className="dashboard-li"
                    >
                        {editingId === event.id ? (
                            <div className="flex flex-col gap-[0.5rem]">
                                <label>
                                    Event Name
                                    <input
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                        className="border p-2 rounded w-full"
                                        title="Event Name"
                                        placeholder="Enter event name"
                                    />
                                </label>
                                <label>
                                    Date
                                    <input
                                        type="date"
                                        value={editForm.date}
                                        onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                                        className="border p-2 rounded w-full"
                                        title="Event Date"
                                    />
                                </label>
                                <label>
                                    Description
                                    <textarea
                                        value={editForm.description}
                                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                        className="border p-2 rounded w-full"
                                        title="Event Description"
                                        placeholder="Enter event description"
                                    />
                                </label>
                                <label>
                                    Time
                                    <input
                                        value={editForm.time}
                                        onChange={e => setEditForm({ ...editForm, time: e.target.value })}
                                        className="border p-2 rounded w-full"
                                        title="Event Time"
                                        placeholder="e.g. 6:00 PM"
                                    />
                                </label>
                                <label>
                                    Location
                                    <input
                                        value={editForm.location}
                                        onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                        className="border p-2 rounded w-full"
                                        title="Event Location"
                                        placeholder="Enter event location"
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
                            <>
								<div className='flex justify-between'>
									<div className='flex flex-col gap-[0.5rem]'>
										<div className="text-[1.25rem] font-[600]">{event.name}</div>
										<div className="text-sm text-gray-600">{event.date}</div>
										<div className="text-sm">{event.description}</div>
										<div className="text-sm font-medium">{event.location} @ {event.time}</div>
									</div>
									<div className="flex justify-between flex-col">
										<button onClick={() => handleEdit(event)} className="btn" type='button' title='Edit Story'>
											<FaPencil/>
										</button>
										<button onClick={() => handleDelete(event.id)} className="btn" type='button' title='Delete Story'>
											<FaTrashAlt/>
										</button>
									</div>
								</div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
