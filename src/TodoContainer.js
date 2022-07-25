import React, { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
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
  const todoStatus = {
    All: "all",
    Done: "done",
    Undone: "undone",
  };

  const [todoList, setTodoList] = useState([]);
  const [todoContent, setTodoContent] = useState("");
  const [showTodoStatus, setShowTodoStatus] = useState(todoStatus.All);

  const getId = () => {
    let id = new Date().getTime();
    return id;
  };

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    if (todoList) {
      setTodoList(todoList);
    }
  }, []);

  const addTodoLocalStorage = (todoList, todo) => {
    localStorage.setItem("todoList", JSON.stringify([...todoList, todo]));
    setTodoList([...todoList, todo]);
  };

  const reviseTodoLocalStorage = (todo) => {
    localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);
  };

  // revise it to local attribute
  // onChange={ (e) => addTodoContent(e, content) }
  const handleAddTodo = (content) => {
    return function addTodoContent(e) {
      if (e.key === "Enter") {
        if (!content || content.trim() === "") return;
        const todo = { id: getId(), content: content, isDone: false };
        addTodoLocalStorage(todoList, todo);
        setTodoContent("");
      }
    };
  };

  const handleInputChange = (e) => {
    setTodoContent(e.target.value);
  };

  // revise it to local attribute
  const handleDeleteTodo = (id) => {
    const leftTodos = todoList.filter((todo) => todo.id !== id);
    reviseTodoLocalStorage(leftTodos);
  };

  const handleTodoIsDone = (id) => {
    const todosCompleteStatus = todoList.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    });
    reviseTodoLocalStorage(todosCompleteStatus);
  };
  const clearCompletedTodo = () => {
    const todosClearAll = todoList.filter((todo) => todo.isDone !== true);
    reviseTodoLocalStorage(todosClearAll);
  };

  const filterTodoStatus = (status) => () => setShowTodoStatus(status);

  return (
    <TodoWrapper>
      <Title>Todo List</Title>
      <CreateTodo>
        <TodoInput
          placeholder="press enter to add a task"
          value={todoContent}
          onChange={handleInputChange}
          onKeyDown={handleAddTodo(todoContent)}
        ></TodoInput>
      </CreateTodo>
      <AllButton onClick={filterTodoStatus(todoStatus.All)}>All</AllButton>
      <ActiveButton onClick={filterTodoStatus(todoStatus.Undone)}>
        Active
      </ActiveButton>
      <CompletedButton onClick={filterTodoStatus(todoStatus.Done)}>
        Completed
      </CompletedButton>
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
      <ClearTodo onClick={clearCompletedTodo}>Clear Completed</ClearTodo>
    </TodoWrapper>
  );
}
