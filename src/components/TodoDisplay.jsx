import "./TodoDisplay.css"
import TodoItem from './TodoItem';

export default function TodoDisplay({todoList , toggleDone , deleteTodo , editTodo , editText , handleEditChange , saveEditChange , displayTodo}) { 

    let isAnyTodoEditing = todoList.some(todo => todo.isEditing)

    let displayTodoList = todoList.filter((todo) => {
        if(displayTodo === "COMPLETED") return todo.isDone
        if(displayTodo === "PENDING") return !todo.isDone
        if(displayTodo === "ALL") return todo  
    })

    if(displayTodoList.length < 1){
        return <h1 className="noTodoHeading">NO TASK</h1>
    }

    return <div >
        {displayTodoList.map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                toggleDone={toggleDone} 
                deleteTodo={deleteTodo} 
                editTodo={editTodo}
                editText={editText} 
                handleEditChange={handleEditChange}
                saveEditChange={saveEditChange}
                isAnyTodoEditing={isAnyTodoEditing}
                
            />
        ))}
    </div>
}