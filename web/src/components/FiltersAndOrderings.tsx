import React from "react";

import {
  FiltersWrapper,
  Orderings,
  CurrencyFilters,
  CurrencyButton,
} from "../styles/ComponentStyles";

interface FiltersAndOrderingsProps {
  setCurrencyFilter: (currency: string) => void;
  currencyFilter: string;
  setSorting: (value: string) => void;
}

const currencyFilters = ["ALL", "USD", "HUF"];

export const FiltersAndOrderings: React.FC<FiltersAndOrderingsProps> = (
  props
) => {
  function handleFilter(currency: string) {
    props.setCurrencyFilter(currency);
  }

  function handleSort(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    props.setSorting(event.target.value);
  }

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={handleSort}>
            <option value="spent_at|desc">
              Sort by Date descending (default)
            </option>
            <option value="spent_at|asc">Sort by Date ascending</option>
            <option value="amount|desc">Sort by Amount descending</option>
            <option value="amount|asc">Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          {currencyFilters.map((currencyFilter) => (
            <li key={currencyFilter}>
              <CurrencyButton
                data-testid={`filter-button-${currencyFilter}`}
                onClick={() => handleFilter(currencyFilter)}
                name={currencyFilter}
                currencyFilter={props.currencyFilter}
              >
                {currencyFilter}
              </CurrencyButton>
            </li>
          ))}
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
};
