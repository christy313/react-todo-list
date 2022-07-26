import { render } from "@testing-library/react";
import TodoItem from "./components/TodoItem";

describe("<TodoItem />", () => {
  const mockTodo = { id: 1, content: "test Todo", isDone: false };

  it("should render a todo object", () => {
    const { debug } = render(<TodoItem todo={mockTodo} />);
    debug();
  });
});
