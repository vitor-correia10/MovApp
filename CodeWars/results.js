//Sum of digits

function digital_root(n) {
    let result = 0;

    n.toString().split('').map(num => {
        result += Number(num);
    })
    return result > 10 ? digital_root(result) : result;
}

digital_root(16), 7
digital_root(456), 6



//Are they the "same"?

function comp(array1, array2) {
    if (!array1 || !array2 || array1.length !== array2.length) return false;
    return array1.map(x => x * x).sort().toString() === array2.sort().toString();
}

a1 = [121, 144, 19, 161, 19, 144, 19, 11];
a2 = [11 * 11, 121 * 121, 144 * 144, 19 * 19, 161 * 161, 19 * 19, 144 * 144, 19 * 19];
Test.assertEquals(comp(a1, a2), true);


//https://codesandbox.io/s/react-challenge-hooks-z1eu2
// Given the following React component:
// - Fetch the data from the API with the provided url variable.
// - Implement the toggleCompletedStatus to toggle a todo as completed/incompleted
// - Modify the css to look like the provided result: https://1drv.ms/u/s!AjGDHcUX3zpyh5tGGJAe_SHrKxP53g?e=laebUJ

// Notes:
// - A completed todo has a line through the title and displays
// a green border instead of a red border.
// - Todo properties: "id" (number), "title" (string), "completed" (boolean).

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const url = "https://jsonplaceholder.typicode.com/todos";

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let result = await fetch(url);
            let data = await result.json();
            setTodos(data);
        };
        fetchData();
    }, []);

    const toggleCompletedStatus = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <ul>
                {todos.map((todo, index) => (
                    <li
                        onClick={() => toggleCompletedStatus(index)}
                        className={todo.completed ? "completed" : ""}
                        key={todo.id}
                    >
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
