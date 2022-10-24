import React from "react";
import { renderWithProviders } from "../testing/test-utils";

import { FiltersAndOrderings } from "./FiltersAndOrderings";

describe("FiltersAndOrderings component", () => {
  const props = {
    setCurrencyFilter: jest.fn(),
    currencyFilter: "ALL",
    setSorting: jest.fn(),
  };

  it("should render component", async () => {
    const { asFragment } = renderWithProviders(
      <FiltersAndOrderings {...props} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
