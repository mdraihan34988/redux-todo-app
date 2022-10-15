import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchTodos from "../redux/todos/thunk/fetchTodos";
import { allCompleted, clearCompleted } from "../redux/todos/actions";
import Todo from "./Todo";
import tickImage from "../assets/images/double-tick.png";
import Swal from "sweetalert2";

export default function TodoList({status}) {
    const todos = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters);
    const todosByStatus = todos.filter((todo) => {
        if(status === "Complete") {
            return todo.completed
        } 
        else if(status === "Incomplete") {
            return !todo.completed
        }})
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchTodos);
    }, [dispatch]);

    const filterByStatus = (todo) => {
        const { status } = filters;
        switch (status) {
            case "Complete":
                return todo.completed;

            case "Incomplete":
                return !todo.completed;

            default:
                return true;
        }
    };

    const filterByColors = (todo) => {
        const { colors } = filters;
        if (colors.length > 0 && status === "Incomplete") {
            return colors.includes(todo?.color);
        }
        return true;
    };

    const completeHadler = () => {
        dispatch(allCompleted());
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Sucessfully completed all todos!`,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
    };

    const clearHeandler = () => {
        dispatch(clearCompleted());
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Sucessfully clear all completed todos!`,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
    };

    return (
    <>
    {todosByStatus && todosByStatus?.length > 0 &&
    <>
        <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
            className="flex space-x-1"
        >
        <h6 className="mb-4 text-sm font-extrabold tracking-tight leading-none text-gray-900 md:text-sm lg:text-sm dark:text-black">
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                {status} {todosByStatus.length < 2 ? 'Task' : 'Tasks' } ({todosByStatus.length})
            </span>
        </h6>
        </li>
            {status === "Incomplete" && <li
                className="flex space-x-1 cursor-pointer"
                onClick={completeHadler}
            >
                <img className="w-4 h-4" src={tickImage} alt="Complete" />
                <span>Complete All Tasks</span>
            </li>}
            {status === "Complete" && <li className="cursor-pointer" onClick={clearHeandler}>
                * Clear Completed
            </li>}
        </ul>
        <hr className="mt-4" />
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {todosByStatus && todosByStatus.length>0 && todosByStatus
                .filter(filterByColors)
                .map((todo) => (
                    <Todo todo={todo} key={todo.id} />
                ))}
        </div>
    </>}
    </>
    );
}
