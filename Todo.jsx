import { useState } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";

export const Todo = () =>{
    const [task, setTask] = useState(() => getLocalStorageTodoData());

    const handleFormSubmit = (inputValue) => {
        const { id, content, checked } = inputValue;
        // to check if the input field  is empty or not
        if(!content) return;

        // to check if the data is already existing or not
        // if(task.includes(inputValue)) return;
        const ifTodoContentMatched = task.find(
            (curTask) => curTask.content === content
            );
            if (ifTodoContentMatched) return;

        setTask((prevTask) => [...prevTask,
            {id, content, checked}]); ///Previous data ko rakhiye with spread operator // If the keys and value are same in JS object, you can use shorthand property names to write them  only once.
        };

    //todo  Add data to localstorage
    setLocalStorageTodoData(task);

    //todo  handleDelete function
    const handleDelete = (value) => {
        const updatedTask = task.filter((curTask) => curTask.content !== value);
        setTask(updatedTask);
    };

    //todo  handleClearBtn functionality
    const handleClearBtn = () => {
        setTask([]);
    };

    //todo  handleCheckedTodo functionality
    const handleCheckedTodo = (content) => {
        const updatedTask = task.map((curTask) => {
            if(curTask.content === content){
                return {...curTask, checked: !curTask.checked}
            } else {
                return curTask;
            }
        });
        setTask(updatedTask);
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDate/>
            </header>
            <TodoForm onAddTodo={handleFormSubmit}/>
            <section className="myUnOderList">
                <ul>
                    {
                        task.map((curTask) => {
                            return <TodoList
                            key={curTask.id}
                            data={curTask.content}
                            checked = {curTask.checked}
                            onHandleDeleteTodo = {handleDelete}
                            onHandleCheckedTodo = {handleCheckedTodo}
                            />
                        })
                    }
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleClearBtn}>Clear All</button>
            </section>
        </section>
    )
}