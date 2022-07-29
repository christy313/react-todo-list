import { render } from "@testing-library/react";
import TodoItem from "./components/TodoItem";
import getId from "./helper";

describe("<TodoItem />", () => {
  const mockTodo = { id: 1, content: "test todo", isDone: false };

  it("should render a todo object", () => {
    const { debug } = render(<TodoItem todo={mockTodo} />);
    debug();
  });
});

describe("test id", () => {
  it("should generate a id by time", () => {
    expect(getId()).toBe(new Date().getTime());
  });
});
