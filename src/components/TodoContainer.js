import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoItem from "./TodoItem";
import {
  TodoWrapper,
  Title,
  CreateTodo,
  TodoInput,
  AddButton,
  SelectTodo,
  AllButton,
  ActiveButton,
  CompletedButton,
  TodoList,
  ClearTodo,
} from "./styles/TodoContainer.style";

export default function TodoContainer() {
  const id = useRef(1);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (localStorage.getItem("savedTasks")) {
      const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
      console.log(savedTasks);
      setTodos(savedTasks);
    }
  }, []);

  const handleAddTodo = useCallback(() => {
    if (!value) return alert("wanna type something?");
    const todo = { id: id.current, content: value };
    localStorage.setItem("savedTasks", JSON.stringify([...todos, todo]));
    setTodos([...todos, todo]);
    setValue("");
    id.current++;
  }, [todos, value]);

  const handleInputChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleDeleteTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const handleTodoIsDone = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        })
      );
    },
    [todos]
  );

  const handleTodoClear = useCallback(() => {
    setTodos(todos.filter((todo) => todo.isDone !== true));
  }, [todos]);

  const filterAll = useCallback(() => {
    setFilter("all");
  }, []);

  const filterDone = useCallback(() => {
    setFilter("done");
  }, []);

  const filterUndone = useCallback(() => {
    setFilter("undone");
  }, []);

  return (
    <TodoWrapper>
      <Title>Todo List</Title>
      <CreateTodo>
        <TodoInput value={value} onChange={handleInputChange}></TodoInput>
        <AddButton onClick={handleAddTodo}>Add Todo</AddButton>
      </CreateTodo>
      <SelectTodo>
        <AllButton onClick={filterAll}>All</AllButton>
        <ActiveButton onClick={filterUndone}>Active</ActiveButton>
        <CompletedButton onClick={filterDone}>Completed</CompletedButton>
      </SelectTodo>
      <TodoList>
        {todos
          .filter((todo) => {
            if (filter === "all") return todo;
            return filter === "done" ? todo.isDone : !todo.isDone;
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              handleDeleteTodo={handleDeleteTodo}
              handleTodoIsDone={handleTodoIsDone}
              todo={todo}
            />
          ))}
      </TodoList>
      <ClearTodo onClick={handleTodoClear}>Clear Completed</ClearTodo>
    </TodoWrapper>
  );
}
