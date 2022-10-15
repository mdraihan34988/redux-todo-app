import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import addTodo from "../redux/todos/thunk/addTodo";

export default function Header() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo(input));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Sucessfully added todo!`,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000
          })
        setInput("");
    };

    return (
        <div>
            <form
                className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
                onSubmit={submitHandler}
            >
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={input}
                    onChange={handleInput}
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>
            </form>
        </div>
    );
}
