import { memo } from "react";
import {
  Todo,
  TodoContent,
  DeleteButton,
  CheckButton,
  ButtonWrapper,
} from "../styles/TodoItem.style";

const TodoItem = ({ todo, todoItems, handleDeleteTodo, handleTodoIsDone }) => {
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id, todoItems);
  };

  const handleIsDoneClick = () => {
    handleTodoIsDone(todo.id, todoItems);
  };

  return (
    <Todo data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <ButtonWrapper>
        <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
        <CheckButton onClick={handleIsDoneClick}>
          {todo.isDone ? "Undone" : "Done"}
        </CheckButton>
      </ButtonWrapper>
    </Todo>
  );
};

export default memo(TodoItem);
