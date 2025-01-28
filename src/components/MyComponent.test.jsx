// src/components/MyComponent.test.jsx
import { render, screen } from "@testing-library/react";
import MyComponent from "@/components/MyComponent"; // Using the alias @/

test("renders the correct title", () => {
  render(<MyComponent title="Hello World" />);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
