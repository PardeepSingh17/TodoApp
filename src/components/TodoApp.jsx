import { useState , useEffect} from "react";
import TodoInput from "./TodoInput";
import { v4 as uuidv4 } from 'uuid';
import TodoDisplay from "./TodoDisplay";

export default function TodoApp() {
    let [todoList, setTodoList] = useState(() => {
        let saved = localStorage.getItem("todos")

        try {
            return saved ? JSON.parse(saved) : [{
                task: "Sample task",
                id: uuidv4(),
                isDone: false,
                isEditing: false
            }]
        } catch {
            return [{
                task: "Sample task",
                id: uuidv4(),
                isDone: false,
                isEditing: false
            }]
        }
    })

    

    let [displayTodo, setDisplayTodo] = useState("ALL")

    let [editText , setEditText] = useState("")
    let[editId , setEditId] = useState("")

    let addTodo = (todo) => {
        setTodoList((oldTodo) => {
            return [...oldTodo , {
                task: todo,
                id: uuidv4(),
                isDone: false,
                isEditing: false
            }]
        })
    }

    let toggleDone = (id) => {
        setTodoList((oldTodo) => (
            oldTodo.map((todo) => {
                if(todo.id === id){
                    return {
                        ...todo,
                        isDone : !todo.isDone
                    }
            }else {
                return todo
            }
        })
        ))
    }

    let deleteTodo = (id) => {
        setTodoList((oldTodo) => {
            return oldTodo.filter((todo) => todo.id !== id)
        })
    }

    let editTodo = (id) => {

        let selectTodo = todoList.find((todo) => todo.id === id)

        setEditText(selectTodo.task)
        setEditId(selectTodo.id)

        setTodoList((oldTodo) => {
            return oldTodo.map((todo) => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        isEditing: true
                    }
                } else {
                    return todo
                }
            })
        })
    }

    let handleEditChange = (event) => {
        setEditText(event.target.value)
    }

    let saveEditChange = (event) => {
        event.preventDefault()

        setTodoList((oldTodo) => {
            return oldTodo.map((todo) => {
                if(todo.id === editId){
                    return {
                        ...todo,
                        task : editText,
                        isEditing : false
                    }
                } else {
                    return todo
                }
            })
        })

        setEditId("")
        setEditText("")
    }

    

    let handleDisplayChange = (display) => {
        setDisplayTodo(display)

        setTodoList((oldTodo) => 
            oldTodo.map((todo) => ({
                ...todo,
                isEditing: false
        }))
        )

        setEditId("")
        setEditText("")
    }

    let completedTask = todoList.filter((todo) => {
        return todo.isDone
    })

    let pendingTask = todoList.filter((todo) => {
        return !todo.isDone
    })

    let taskCount = {
        totalTask : todoList.length,
        completedTask : completedTask.length,
        pendingTask : pendingTask.length
    }

    useEffect(() => {
        localStorage.setItem("todos" , JSON.stringify(todoList))
    }, [todoList])


    return <div>
        
        <TodoInput 
            addTodo={addTodo}
            handleDisplayChange={handleDisplayChange}
            displayTodo={displayTodo}
            todoList={todoList}
            taskCount={taskCount}
        />
        <TodoDisplay 
            todoList={todoList} 
            toggleDone={toggleDone} 
            deleteTodo={deleteTodo} 
            editTodo={editTodo}
            editText={editText} 
            handleEditChange={handleEditChange}
            saveEditChange={saveEditChange}
            displayTodo={displayTodo}
        />
    </div>
}