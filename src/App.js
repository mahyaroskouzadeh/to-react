import React from "react";

import { TodoList } from "./todoList";
import "./App.css";

function App() {
  const [showTodoList, setShowTodoList] = React.useState(true);

  return (
    <div className=" mt-[100px]">
      <button onClick={() => setShowTodoList((prevState) => !prevState)}>
        {showTodoList ? "hide todo list" : "show todo list"}
      </button>
      {!showTodoList ? <h1>todo list hided</h1> : <TodoList />}
    </div>
  );
}

export default App;
