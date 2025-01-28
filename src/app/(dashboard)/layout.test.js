import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Layout from "./layout"; // Adjust the path as needed
import "@testing-library/jest-dom"; // For extended matchers like "toBeInTheDocument"

// Mock the child components like NavigationMobile
jest.mock("@/components/Shared/NavigationMobile", () => () => (
  <div data-testid="navigation-mobile" />
));

describe("Layout Component", () => {
  test("renders the sidebar in closed state by default", () => {
    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    // Assert sidebar starts closed
    expect(screen.queryByText("MyTube")).not.toBeInTheDocument(); // Title hidden
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  test("toggles the sidebar on button click", () => {
    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    const toggleButton = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(toggleButton); // Open sidebar

    // Assert sidebar opens
    expect(screen.getByText("MyTube")).toBeInTheDocument();

    fireEvent.click(toggleButton); // Close sidebar
    expect(screen.queryByText("MyTube")).not.toBeInTheDocument();
  });

  test("renders the child content", () => {
    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    // Assert child content is rendered
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  test("renders NavigationMobile", () => {
    render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    // Assert the NavigationMobile mock is rendered
    expect(screen.getByTestId("navigation-mobile")).toBeInTheDocument();
  });
});
