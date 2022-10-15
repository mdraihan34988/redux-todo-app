import { loaded } from "../actions";

const fetchTodos = async (dispatch) => {
    const response = await fetch(process.env.REACT_APP_API_URL+"/todos");
    const todos = await response.json();
    dispatch(loaded(todos));
};

export default fetchTodos;
