import React, { cloneElement, useState } from "react";
import { TaskItem } from "./taskItem";

export const TodoList = () => {
  const [inputTxt, setInputTxt] = React.useState("");
  const [myArray, setMyArray] = React.useState([]);
  const [filterArray, setFilterArray] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const firstUpdate = React.useRef(true);
  const [meno, setMeno] = React.useState("all");
  const [array2, setarray2] = React.useState([]);
  const [type, setType] = useState("password");
  React.useEffect(() => {
    if (firstUpdate.current) {
      const localStorageTasks = localStorage.getItem("myArray");
      if (!localStorageTasks) {
        localStorage.setItem("myArray", JSON.stringify(myArray));
      } else {
        const parseArray = JSON.parse(localStorageTasks);
        setMyArray(parseArray);
      }

      firstUpdate.current = false;
      return;
    }
    console.log(myArray);
    console.log("mahyar");

    localStorage.setItem("myArray", JSON.stringify(myArray));
  }, [myArray]);

  const addTaskToMyArray = (name) => {
    const uniqueId = Date.now();
    const myObj = { id: uniqueId, isDone: false, name };
    setMyArray([...myArray, myObj]);
    setInputTxt("");
    setFilterValue("");
  };

  const handleDeleteTask = (id) => {
    const newArray = myArray.filter((item) => item.id != id);
    setMyArray(newArray);
  };

  const chekboxTask = (id) => {
    const newArray = myArray.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          isDone: !item.isDone,
        };
      }
      return item;
    });
    setMyArray(newArray);
  };

  React.useEffect(() => {
    menoFun();
  }, [array2, myArray]);
  const menoFun = () => {
    console.log("meno =======> ", meno);
    switch (meno) {
      case "all":
        setarray2(myArray);
        break;
      case "true":
        setarray2(myArray.filter((myArray) => myArray.isDone === false));

        break;
      case "false":
        break;
    }
    console.log(meno);
    console.log(array2);
  };

  const filterByTag = (array, tag) => {
    if (tag === "done") return array.filter((item) => item.isDone);

    if (tag === "active") return array.filter((item) => !item.isDone);

    return array;
  };

  const filterByName = (array, value) =>
    array.filter((item) => item.name.includes(value));

  const onoff = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div>
      <select
        // onChange={menoFun}
        onClick={(e) => setMeno(e.target.value)}
        name="select"
        id=""
      >
        <option value="all">all</option>
        <option value="done">true</option>
        <option value="active">false</option>
      </select>
      <div style={{ display: "flex" }}>
        <input
          value={inputTxt}
          onChange={(event) => {
            setInputTxt(event.target.value);
          }}
          placeholder="please enter name "
        />

        <button onClick={() => addTaskToMyArray(inputTxt)}>send</button>
      </div>

      <input
        type="text"
        value={filterValue}
        onChange={(e) => {
          const value = e.target.value;
          setFilterValue(value);
          const filterArray = myArray.filter((item) =>
            item.name.includes(value)
          );
          setFilterArray(filterArray);
        }}
      />
      <ul style={{ padding: "0px", listStyle: "none" }}>
        {/* {(!filterValue ? filterByTag(myArray, meno) : filterByTag(filterArray, meno)).map( */}
        {filterByTag(filterByName(myArray, filterValue), meno).map((item) => {
          return (
            <TaskItem
              key={item.id}
              item={item}
              onDelete={handleDeleteTask}
              oncheck={chekboxTask}
            />
          );
        })}
      </ul>

      <input type={type} />
      <button onClick={onoff}></button>
    </div>
  );
};
