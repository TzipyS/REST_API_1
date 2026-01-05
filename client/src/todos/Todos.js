import { useEffect, useState } from "react";
import FormDialog from "./createTodo";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import deleteTodo from "./DeleteTodo";
import handleCheckboxChange from "./changeTodo"
import { fetchTodos as apiFetchTodos } from "./ApiTodos";
import UpdateTodoDialog from "./UpdateTodo"
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";


const Todos = () => {
    const [todos, setTodos] = useState([])
    const [filteredTodos, setFilteredTodos] = useState([]);
    const { query } = useOutletContext();

    const fetchTodos = async () => {
        try {
            const { data } = await apiFetchTodos();
            setTodos(data)
            setFilteredTodos(data)
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

        useEffect(() => {
        if (!todos) return
        const filtred = todos.filter(todo =>
            Object.values(todo).some(value =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        )
        setFilteredTodos(filtred)
    }, [query, todos])

    if (todos.length === 0) return <h1>Loading...</h1>
    

    return (
        <div className="todos">
            <Button variant="outlined" component={RouterLink}to="/">
                HOME
            </Button>
            <FormDialog />
            {filteredTodos.map((todo) => (
                <div key={todo._id} className="todo-item">
                    <h3>{todo.title}</h3>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                            variant="contained"
                            onClick={() => handleCheckboxChange({ id: todo._id, todos, setTodos })}>
                            {todo.completed ? "✔ Completed" : "Pending"}
                        </Button>

                        <Stack spacing={2} direction="row">
                            <Button
                                variant="outlined" startIcon={<DeleteIcon />}
                                onClick={() => deleteTodo({ id: todo._id, todos, setTodos })} >
                                Delete
                            </Button>
                            <UpdateTodoDialog todo={todo} todos={todos} setTodos={setTodos} />
                        </Stack>
                    </Stack>
                </div>
            ))}

        </div>
    )
}
export default Todos