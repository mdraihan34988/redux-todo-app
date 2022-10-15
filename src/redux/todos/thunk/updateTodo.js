import { updated } from "../actions";

const updateTodo = (todoText,todoId) => {
    return async (dispatch) => {
        const response = await fetch(process.env.REACT_APP_API_URL+`/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({
                text: todoText,
                id : todoId,
                completed: false,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const todo = await response.json();
        debugger
        dispatch(updated(todo.text,todo.id));
    };
};

export default updateTodo;
