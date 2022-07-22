import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoItem from "./TodoItem";
import {
  TodoWrapper,
  Title,
  CreateTodo,
  TodoInput,
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
    if (localStorage.getItem("savedLocalTodos")) {
      const savedLocalTodos = JSON.parse(
        localStorage.getItem("savedLocalTodos")
      );
      setTodos(savedLocalTodos);
    }
  }, []);

  const handleAddTodo = useCallback(
    (e) => {
      if (!value || value.trim() === "") return;
      if (e.key === "Enter") {
        const todo = { id: id.current, content: value, isDone: false };
        localStorage.setItem(
          "savedLocalTodos",
          JSON.stringify([...todos, todo])
        );
        setTodos([...todos, todo]);
        setValue("");
        id.current++;
      }
    },
    [todos, value]
  );

  const handleInputChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleDeleteTodo = useCallback(
    (id) => {
      const leftTodos = todos.filter((todo) => todo.id !== id);
      localStorage.setItem("savedLocalTodos", JSON.stringify(leftTodos));
      setTodos(leftTodos);
    },
    [todos]
  );

  const handleTodoIsDone = useCallback(
    (id) => {
      const todosCompleteStatus = todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      });
      localStorage.setItem(
        "savedLocalTodos",
        JSON.stringify(todosCompleteStatus)
      );
      setTodos(todosCompleteStatus);
    },
    [todos]
  );

  const handleTodoClear = useCallback(() => {
    const todosClearAll = todos.filter((todo) => todo.isDone !== true);
    localStorage.setItem("savedLocalTodos", JSON.stringify(todosClearAll));
    setTodos(todosClearAll);
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
        <TodoInput
          placeholder="press enter to add a task"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleAddTodo}
        ></TodoInput>
      </CreateTodo>
      <AllButton onClick={filterAll}>All</AllButton>
      <ActiveButton onClick={filterUndone}>Active</ActiveButton>
      <CompletedButton onClick={filterDone}>Completed</CompletedButton>
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
