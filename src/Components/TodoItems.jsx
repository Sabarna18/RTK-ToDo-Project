import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, editTask, setSearchFilter, setStatusFilter, toggleComplete } from "../Features/TodoSlice"

const TaskList = () => {
    const { tasks, filter } = useSelector((state) => state.tasks)
    const dispatch = useDispatch()
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')
    const [istotoeditable, setistodoeditable] = useState(false)
    console.log(tasks)


    const filteredTasks = tasks.filter(task => {
        if (filter.status === 'completed') return task.completed;
        if (filter.status === 'pending') return !task.completed;
        return true;
    }).filter(task => task.text.toLowerCase().includes(filter.search.toLowerCase()));

    const handleEdit = (id, text) => {
        setEditId(id);
        setEditText(text);
        setistodoeditable(true);
    }
    const handleEditSave = (id) => {
        if (editText.trim()) {
            dispatch(editTask({ id, newText: editText.trim() }));
            setEditId(null);
            setEditText('');
            setistodoeditable(false);
        }
    }
    return (
        <div className="bg-slate-600 mx-auto p-4 m-4 rounded-xl">
            <div className="bg-slate-800 mx-auto p-4 m-4 rounded-xl">
                {/* search task */}

                <div className="bg-transparent p-4 m-2 items-center rounded-2xl">
                    <input type="text" placeholder="Search tasks" value={filter.search}
                        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
                        className="w-full bg-gray-400 hover:bg-gray-200 p-2 border rounded " />

                </div>

                {/* Filtering Tasks */}
                <div className="flex gap-4 mb-4">
                    {
                        ['all', 'completed', 'pending'].map(status => (
                            <button
                                onClick={() => dispatch(setStatusFilter(status))}
                                className={`px-5 py-2 border-black-xl rounded-xl hover:cursor-pointer border 
                                ${filter.status === status ? 'bg-red-500 hover:bg-red-700 text-white' :
                                        'bg-green-500 hover:bg-green-700'}`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))
                    }
                </div>
            </div>





            {/* Display Tasks */}
            <ul className="space-y-2">
                {filteredTasks.length === 0 && <p className="text-white font-bold">No tasks found.</p>}
                {
                    filteredTasks.map(task => (
                        <li key={task.id} className={`flex items-center cursor-pointer hover:bg-blue-300 bg-[#ccbed7] 
                        ${task.completed ? `bg-green-300` : `bg-[#ccbed7]`} rounded-xl w-full justify-between border p-2 m-2`}>
                            <div className="flex items-center ">
                                <input type="checkbox"
                                    checked={task.completed}
                                    onChange={(e) => { if (!istotoeditable) dispatch(toggleComplete(task.id)) }}
                                    className="border cursor-pointer rounded px-2"
                                />
                                {
                                    editId === task.id ? (
                                        <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}
                                            className="border w-full bg-white rounded px-2" />
                                    ) : (<span className={`  ${task.completed ? 'line-through  text-black' : ''}`}>{task.text}</span>)
                                }
                            </div>

                            <div className="flex gap-2">
                                {
                                    editId === task.id ? (
                                        <button
                                            onClick={() => handleEditSave(task.id)}
                                            className="inline-flex w-8 h-8 hover:cursor-pointer rounded-lg text-sm border
                                             border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 
                                             shrink-0 disabled:opacity-50">📁
                                        </button>
                                    ) : (
                                        <button onClick={() => { if (!task.completed) handleEdit(task.id, task.text) }}
                                            className="p-2 bg-white rounded cursor-pointer">✏️
                                        </button>

                                    )
                                }
                                <button onClick={() => dispatch(deleteTask(task.id))}
                                    className="p-2 bg-white rounded cursor-pointer">❌
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TaskList