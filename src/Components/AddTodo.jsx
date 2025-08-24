import { useState } from "react"
import { useDispatch } from "react-redux";
import { addTask } from "../Features/TodoSlice";
import { nanoid } from 'nanoid'

const TaskForm = () => {
    const [text, setText] = useState('');

    const dispatch = useDispatch()

    const add = (e) => {
        e.preventDefault();

        if (text.trim() === '') return;

        dispatch(addTask({
            id: nanoid(),
            text: text.trim(),
            completed: false,
        }))

        setText('')

    }

    return (


        <div className="bg-[#d91093] mx-auto rounded-2xl shadow-2xl p-4">
            <h1 className='text-2xl text-white font-bold p-2 m-2'>Task Manager</h1>
            <form onSubmit={add} className="flex items-center  p-4 rounded-xl gap-2 mb-4">

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add new task"
                    className="flex-1 p-2 bg-[#a7a6b7] rounded-md hover:bg-[#c8c9d6] border"
                />

                <button type="submit" className="bg-blue-500 text-white px-6 py-2 
                cursor-pointer rounded hover:bg-blue-600">Add Task</button>
            </form>
        </div>
    )
}

export default TaskForm