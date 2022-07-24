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
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    if (todoList) {
      setTodoList(todoList);
    }
  }, []);

  const updateLocalStorage = (todoList, todo) => {
    localStorage.setItem("todoList", JSON.stringify([...todoList, todo]));
    setTodoList([...todoList, todo]);
  };

  const handleAddTodo = useCallback(
    (e) => {
      if (!todoContent || todoContent.trim() === "") return;
      if (e.key === "Enter") {
        const todo = { id: id.current, content: todoContent, isDone: false };
        updateLocalStorage(todoList, todo);
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
      updateLocalStorage(todoList, leftTodos);
    },
    [todoList]
  );

  // const setLocalStorage = (todoList, todo) => {
  //   localStorage.setItem("todoList", JSON.stringify([...todoList, todo]));
  //   setTodoList([...todoList, todo]);
  // };

  const handleTodoIsDone = useCallback(
    (id) => {
      const todosCompleteStatus = todoList.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      });
      updateLocalStorage(todoList, todosCompleteStatus);
    },
    [todoList]
  );

  const handleTodoClear = () => {
    const todosClearAll = todoList.filter((todo) => todo.isDone !== true);
    updateLocalStorage(todoList, todosClearAll);
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
