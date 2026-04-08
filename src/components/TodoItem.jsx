import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function TodoItem({todo , toggleDone , deleteTodo , editTodo , editText , handleEditChange , saveEditChange , isAnyTodoEditing}) {

    return <>
    {!todo.isEditing ? (
            
            <div className={todo.isDone ? "TodoDiv doneStyling" : "TodoDiv notDoneStyling"} >
                <div className='left'>
                    <Checkbox checked={todo.isDone} onChange={() => toggleDone(todo.id)}/>
                    <span style={{opacity: todo.isDone ? 0.5: 1}}>{todo.task}</span>
                </div>
                <div className='right'>
                    <IconButton aria-label='edit'>
                        {!isAnyTodoEditing ? <EditIcon className='editIcon' style={{cursor: "pointer"}} onClick={()=> editTodo(todo.id)}/> : null}
                    </IconButton>
                    <IconButton>
                        <DeleteIcon className='deleteIcon' style={{cursor: "pointer"}} onClick={() => deleteTodo(todo.id)}/>   
                    </IconButton>
                </div>
                
            </div> ) : (
                
                <div key={todo.id} className={todo.isDone ? "TodoDiv doneStyling" : "TodoDiv notDoneStyling"}>
                <div className='left'>
                    <TextField id="outlined-basic" label="Edit Task" variant="outlined" className='Edit' value={editText} onChange={handleEditChange}/>
                </div>
                <div className='right'>
                    <Button variant="contained" onClick={saveEditChange}>Save</Button>
                </div>
                
            </div>
            )}
    </>
}