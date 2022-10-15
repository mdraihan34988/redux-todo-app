import { useDispatch } from "react-redux";
import cancelImage from "../assets/images/cancel.png";
import editImage from "../assets/images/pencil.png";
import deleteTodo from "../redux/todos/thunk/deleteTodo";
import updateTodo from "../redux/todos/thunk/updateTodo";
import updateColor from "../redux/todos/thunk/updateColor";
import updateStatus from "../redux/todos/thunk/updateStatus";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Todo({ todo }) {
    const dispatch = useDispatch();

    const { text, id, completed, color } = todo;
    const [todoText,setTodoText] = useState(text);
    const [editToggle,setEditToggle] = useState(false);

    const handleStatusChange = (todoId) => {
        dispatch(updateStatus(todoId, completed));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Sucessfully todo status changed to ${completed? "Incomplete" : "Complete"}!`,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
    };

    const handleColorChange = (todoId, color) => {
        if (completed) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Action denied!',
                text:'Can not change priority of completed todos',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 2500
              })
        } else {
            dispatch(updateColor(todoId, color));
            if(color === "green") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully set Low priority to the Task!',
                    showConfirmButton: false,
                    showCloseButton: true,
                    timer: 1500
                  })
            } else if(color === "yellow") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully set Medium priority to the Task!',
                    showConfirmButton: false,
                    showCloseButton: true,
                    timer: 1500
                  })
            } else if(color === "red") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully set High priority to the Task!',
                    showConfirmButton: false,
                    showCloseButton: true,
                    timer: 1500
                  })
            }
        }
    };

    const handleDelete = (todoId) => {
        dispatch(deleteTodo(todoId));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Todo Successfully Deleted!',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 1500
          })
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateTodo(todoText,id));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Todo Successfully Edited!',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 1500
          })
        setEditToggle(false);
    }

    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 
                ${
                    completed &&
                    "border-green-500 focus-within:border-green-500"
                }`}
            >
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleStatusChange(id)}
                    className="opacity-0 absolute rounded-full"
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

            <div
                className={`select-none flex-1`} 
                // ${completed && "line-through"}
                
            >
                {editToggle?
                <form onSubmit={submitHandler}>
                    <input type="text" id="floating_outlined" value={todoText} onChange={(e)=>setTodoText(e.target.value)} 
                    className="block rounded-t-lg px-2.5 pb-1 pt-1 w-full text-sm text-gray-900 bg-white-50 dark:bg-white-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                </form> 
                :<>{text}</>}
            </div>
            {!completed && <img
                src={editImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Edit"
                onClick={() => setEditToggle(() => {return !editToggle})}
            />}

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                    color === "green" && "bg-green-500"
                }`}
                onClick={() => handleColorChange(id, "green")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                    color === "yellow" && "bg-yellow-500"
                }`}
                onClick={() => handleColorChange(id, "yellow")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                    color === "red" && "bg-red-500"
                }`}
                onClick={() => handleColorChange(id, "red")}
            ></div>

            <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}
