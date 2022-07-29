import { render } from "@testing-library/react";
import TodoItem from "./TodoItem";

describe("<TodoItem />", () => {
  it("should render a todo object", () => {
    const mockTodo = jest.fn();
    render(<TodoItem todo={mockTodo} />);
  });
});
