import React from "react";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../testing/test-utils";
import { useSpendings } from "../hooks/useSpendings";

import { SpendingList } from "./SpendingList";

jest.mock("../hooks/useSpendings");

describe("SpendingList component", () => {
  const mockedUseSpendings = useSpendings as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render empty state if no spendings", async () => {
    mockedUseSpendings.mockImplementation(() => ({
      data: [],
      isLoading: false,
      error: null,
    }));
    renderWithProviders(<SpendingList />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("should render loading state if no spendings", async () => {
    mockedUseSpendings.mockImplementation(() => ({
      data: [],
      isLoading: true,
      error: null,
    }));
    renderWithProviders(<SpendingList />);

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("should render error state if no spendings", async () => {
    mockedUseSpendings.mockImplementation(() => ({
      data: [],
      isLoading: false,
      error: "something went wrong",
    }));
    renderWithProviders(<SpendingList />);

    expect(screen.getByTestId("error-state")).toBeInTheDocument();
  });

  it("should render component with the spending list", async () => {
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
      ],
      isLoading: false,
      error: null,
    }));
    renderWithProviders(<SpendingList />);

    expect(screen.getAllByTestId("spending-record")).toHaveLength(2);
  });
});
