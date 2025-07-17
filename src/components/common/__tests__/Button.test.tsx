import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../Button";

// Mock the theme context
jest.mock("@/contexts/ThemeContext", () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: "#007AFF",
        secondary: "#5856D6",
        background: "#FFFFFF",
        surface: "#F2F2F7",
        text: "#000000",
        textSecondary: "#8E8E93",
        error: "#FF3B30",
        success: "#34C759",
        warning: "#FF9500",
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
      borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
      },
    },
  }),
}));

describe("Button Component", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />,
    );

    expect(getByText("Test Button")).toBeTruthy();
  });

  it("renders with different variants", () => {
    const { getByText, rerender } = render(
      <Button title="Primary" variant="primary" onPress={mockOnPress} />,
    );

    expect(getByText("Primary")).toBeTruthy();

    rerender(
      <Button title="Secondary" variant="secondary" onPress={mockOnPress} />,
    );

    expect(getByText("Secondary")).toBeTruthy();

    rerender(
      <Button title="Outline" variant="outline" onPress={mockOnPress} />,
    );

    expect(getByText("Outline")).toBeTruthy();

    rerender(<Button title="Text" variant="text" onPress={mockOnPress} />);

    expect(getByText("Text")).toBeTruthy();
  });

  it("renders with different sizes", () => {
    const { getByText, rerender } = render(
      <Button title="Small" size="small" onPress={mockOnPress} />,
    );

    expect(getByText("Small")).toBeTruthy();

    rerender(<Button title="Medium" size="medium" onPress={mockOnPress} />);

    expect(getByText("Medium")).toBeTruthy();

    rerender(<Button title="Large" size="large" onPress={mockOnPress} />);

    expect(getByText("Large")).toBeTruthy();
  });

  it("handles press events", () => {
    const { getByText } = render(
      <Button title="Press Me" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText("Press Me"));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    const { getByText } = render(
      <Button title="Loading" loading={true} onPress={mockOnPress} />,
    );

    expect(getByText("Loading")).toBeTruthy();

    // Button should be disabled when loading
    fireEvent.press(getByText("Loading"));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("handles disabled state", () => {
    const { getByText } = render(
      <Button title="Disabled" disabled={true} onPress={mockOnPress} />,
    );

    expect(getByText("Disabled")).toBeTruthy();

    // Button should not respond to press when disabled
    fireEvent.press(getByText("Disabled"));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("applies custom testID", () => {
    const { getByTestId } = render(
      <Button title="Test" testID="custom-button" onPress={mockOnPress} />,
    );

    expect(getByTestId("custom-button")).toBeTruthy();
  });

  it("does not call onPress when button is loading", () => {
    const { getByText } = render(
      <Button title="Loading Button" loading={true} onPress={mockOnPress} />,
    );

    fireEvent.press(getByText("Loading Button"));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("does not call onPress when button is disabled", () => {
    const { getByText } = render(
      <Button title="Disabled Button" disabled={true} onPress={mockOnPress} />,
    );

    fireEvent.press(getByText("Disabled Button"));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("renders without onPress prop", () => {
    const { getByText } = render(<Button title="No Handler" />);

    expect(getByText("No Handler")).toBeTruthy();

    // Should not crash when pressed without onPress
    fireEvent.press(getByText("No Handler"));
  });
});
