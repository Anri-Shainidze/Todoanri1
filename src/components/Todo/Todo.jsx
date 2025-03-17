import "./todo.css";
import React, { useState, useEffect } from "react";
import { GoTrash } from "react-icons/go";
import Logo from "../../assets/logo.png";

const Todo = (

) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return (

    ) => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (

  ) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  const getDayOfWeek = (

  ) => {
    const days = [
      "Mon", "Tue", "Sun", "Wed", "Fri", "Thur", "Sat"
    ];
    return days[date.getDay()];
  };

  const getDate = (

  ) => {
    return date.getDate();
  };

  const [
    todos, setTodos
  ] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
        "Dinner", "Walk with Coby", "Buy Groceries", "Go to repair shop"
      ];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "todos", JSON.stringify(todos)
    );
  }, [todos]);

  const addTodo = (

  ) => {
    if (input) {
      setTodos(
        [...todos, input]
      );
      setInput("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="for-todocontainer">
      <div className="img">
        <img src={Logo} alt="Logo" />
        <p>{getDayOfWeek()}</p>
        <h6>{getDate()}</h6>
        <h5>{formatTime()}</h5>
      </div>

      <div className="first-inputline">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a task"
        />
        <button onClick={addTodo}>+</button>
      </div>

      <div className="todos-listebfirst">
        {todos.map((todo, index) => (
          <div className="for-todoitems" key={index}>
            <div className="forfirst">


              <span className="forsecond">{todo}</span>
              <span>{formatTime()}</span>


            </div>
            <div className="box">
              <input type="checkbox" name="" id="mokosok" />
              <GoTrash id="mokvasouri" onClick={() => deleteTodo(index)} />
            </div>
          </div>
        )
        )}
      </div>
    </div>
  );
};

export default Todo;
