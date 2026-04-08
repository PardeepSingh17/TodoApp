import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import { useState , useRef, useEffect} from 'react';
import "./TodoInput.css"

export default function TodoInput({addTodo , handleDisplayChange , displayTodo , todoList , taskCount}) {
    let [todo, setTodo] = useState("")
    let [error, setError] = useState("")

    let inputRef = useRef(null)

    let handleChange = (event) => {
        setTodo(event.target.value)
        setError("")
    }

    let handleSubmit = (event) => {
        event.preventDefault()
        if(todoList.some((t) => t.task.toLowerCase().trim() === todo.toLowerCase().trim())){
            setError("Task already exist")
        } else {
            addTodo(todo)
            setTodo("")
        }
        
    }

    useEffect(() => {
        inputRef.current.focus()
    } , [])

    return <div className='inputDiv'>
        <form onSubmit={handleSubmit} className='Form'>
            <TextField id="outlined-basic" label="Enter Task" variant="outlined" className='input' onChange={handleChange} value={todo} inputRef={inputRef}/>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' disabled={todo.trim() === ""}>
                Add task
            </Button>
        </form>

        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={() => handleDisplayChange("ALL")} disabled={displayTodo === "ALL"}>All ({taskCount.totalTask})</Button>
            <Button onClick={() => handleDisplayChange("COMPLETED")} disabled={displayTodo === "COMPLETED"}>Completed ({taskCount.completedTask})</Button>
            <Button onClick={() => handleDisplayChange("PENDING")} disabled={displayTodo === "PENDING"}>Pending ({taskCount.pendingTask})</Button>
        </ButtonGroup>

        {error && <Alert severity="error" className='error'>{error}</Alert>}
    </div>
}