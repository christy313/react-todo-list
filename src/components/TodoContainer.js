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
} from "../styles/TodoContainer.style";

export default function TodoContainer() {
  const todoStatus = Object.freeze({
    All: "all",
    Done: "done",
    Undone: "undone",
  });
  const id = useRef(1);
  const [todoList, setTodoList] = useState([]);
  const [todoContent, setTodoContent] = useState("");
  const [showTodoStatus, setShowTodoStatus] = useState(todoStatus.All);

  useEffect(() => {
    if (localStorage.getItem("savedLocalTodos")) {
      const savedLocalTodos = JSON.parse(
        localStorage.getItem("savedLocalTodos")
      );
      setTodoList(savedLocalTodos);
    }
  }, []);

  const handleAddTodo = useCallback(
    (e) => {
      if (!todoContent || todoContent.trim() === "") return;
      if (e.key === "Enter") {
        const todo = { id: id.current, content: todoContent, isDone: false };
        localStorage.setItem(
          "savedLocalTodos",
          JSON.stringify([...todoList, todo])
        );
        setTodoList([...todoList, todo]);
        setTodoContent("");
        id.current++;
      }
    },
    [todoList, todoContent]
  );

  const handleInputChange = (e) => {
    setTodoContent(e.target.value);
  };

  const handleDeleteTodo = useCallback(
    (id) => {
      const leftTodos = todoList.filter((todo) => todo.id !== id);
      localStorage.setItem("savedLocalTodos", JSON.stringify(leftTodos));
      setTodoList(leftTodos);
    },
    [todoList]
  );

  const handleTodoIsDone = useCallback(
    (id) => {
      const todosCompleteStatus = todoList.map((todo) => {
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
      setTodoList(todosCompleteStatus);
    },
    [todoList]
  );

  const handleTodoClear = () => {
    const todosClearAll = todoList.filter((todo) => todo.isDone !== true);
    localStorage.setItem("savedLocalTodos", JSON.stringify(todosClearAll));
    setTodoList(todosClearAll);
  };

  const filterAll = useCallback(() => {
    setShowTodoStatus(todoStatus.All);
  }, [todoStatus.All]);

  const filterDone = useCallback(() => {
    setShowTodoStatus(todoStatus.Done);
  }, [todoStatus.Done]);

  const filterUndone = useCallback(() => {
    setShowTodoStatus(todoStatus.Undone);
  }, [todoStatus.Undone]);

  return (
    <TodoWrapper>
      <Title>Todo List</Title>
      <CreateTodo>
        <TodoInput
          placeholder="press enter to add a task"
          value={todoContent}
          onChange={handleInputChange}
          onKeyDown={handleAddTodo}
        ></TodoInput>
      </CreateTodo>
      <AllButton onClick={filterAll}>All</AllButton>
      <ActiveButton onClick={filterUndone}>Active</ActiveButton>
      <CompletedButton onClick={filterDone}>Completed</CompletedButton>
      <TodoList>
        {todoList
          .filter((todo) => {
            if (showTodoStatus === todoStatus.All) return todo;
            return showTodoStatus === todoStatus.Done
              ? todo.isDone
              : !todo.isDone;
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
