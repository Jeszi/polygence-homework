import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../testing/test-utils";

import { Form } from "./Form";

describe("Form component", () => {
  it("should render component", async () => {
    const { asFragment } = renderWithProviders(<Form />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should have errors if validation is failed", async () => {
    renderWithProviders(<Form />);
    userEvent.click(screen.getByTestId("save-button"));

    expect(screen.getByTestId("description-input")).toHaveStyle(
      "border: solid 1px red"
    );
    expect(screen.getByTestId("amount-input")).toHaveStyle(
      "border: solid 1px red"
    );
  });

  it("should not have errors if validation is passed", async () => {
    renderWithProviders(<Form />);
    fireEvent.change(screen.getByTestId("description-input"), {
      target: { value: "test" },
    });

    fireEvent.change(screen.getByTestId("amount-input"), {
      target: { value: 10 },
    });

    userEvent.click(screen.getByTestId("save-button"));

    expect(screen.getByTestId("description-input")).not.toHaveStyle(
      "border: solid 1px red"
    );
    expect(screen.getByTestId("amount-input")).not.toHaveStyle(
      "border: solid 1px red"
    );
  });

  it("should remove errors when input is focused", async () => {
    renderWithProviders(<Form />);
    userEvent.click(screen.getByTestId("save-button"));

    expect(screen.getByTestId("description-input")).toHaveStyle(
      "border: solid 1px red"
    );
    expect(screen.getByTestId("amount-input")).toHaveStyle(
      "border: solid 1px red"
    );

    fireEvent.change(screen.getByTestId("description-input"), {
      target: { value: "test" },
    });

    expect(screen.getByTestId("description-input")).not.toHaveStyle(
      "border: solid 1px red"
    );
  });
});
