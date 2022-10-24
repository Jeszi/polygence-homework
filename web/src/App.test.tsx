import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

import { useSpendings } from "./hooks/useSpendings";
import { renderWithProviders } from "./testing/test-utils";

jest.mock("./hooks/useSpendings");

describe("App component", () => {
  const mockedUseSpendings = useSpendings as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should should filter by currency", async () => {
    mockedUseSpendings.mockImplementation(() => ({
      data: [
        {
          id: "1",
          amount: "50",
          description: "Mango",
          spent_at: "2012",
          currency: "USD",
        },
        {
          id: "2",
          amount: "70",
          description: "Banana",
          spent_at: "2018",
          currency: "HUF",
        },
        {
          id: "3",
          amount: "70",
          description: "Banana",
          spent_at: "2004",
          currency: "USD",
        },
      ],
      isLoading: false,
      error: null,
    }));
    renderWithProviders(<App />);

    expect(screen.getAllByTestId("spending-record")).toHaveLength(3);

    userEvent.click(screen.getByTestId("filter-button-USD"));
    expect(screen.getAllByTestId("spending-record")).toHaveLength(2);

    userEvent.click(screen.getByTestId("filter-button-HUF"));
    expect(screen.getAllByTestId("spending-record")).toHaveLength(1);

    userEvent.click(screen.getByTestId("filter-button-ALL"));
    expect(screen.getAllByTestId("spending-record")).toHaveLength(3);
  });
});
