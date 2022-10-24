import React, { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import orderBy from "lodash/orderBy";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";

import { FiltersAndOrderings } from "../components/FiltersAndOrderings";

import { useSpendings } from "../hooks/useSpendings";
import { SpendingDB } from "../types/spendings";

export const SpendingList: React.FC = () => {
  const { data: spendings, isLoading, error } = useSpendings();
  const [sorting, setSorting] = useState("date_desc");
  const [currencyFilter, setCurrencyFilter] = useState("ALL");

  function getSortedSpendings(sortableSpendings: SpendingDB[]): SpendingDB[] {
    const sort = sorting.split("|");
    const sortBy = sort[0];
    const sortDirection = sort[1] === "asc" ? "asc" : "desc";

    return orderBy(sortableSpendings, [sortBy], [sortDirection]);
  }

  function getFilteredSpendings(): SpendingDB[] {
    if (!spendings) {
      return [];
    }

    if (currencyFilter === "ALL") {
      return spendings;
    }

    return spendings.filter((spending) => spending.currency === currencyFilter);
  }

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <ErrorMessage data-testid="error-state">
        The server is probably down. Please try again later.
      </ErrorMessage>
    );
  }
  if (!spendings?.length) {
    return (
      <h1
        style={{ textAlign: "center", marginTop: "4rem" }}
        data-testid="empty-state"
      >
        Yay!{" "}
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          🎉
        </span>{" "}
        No spendings!
      </h1>
    );
  }

  const filteredSpendings = getFilteredSpendings();
  const sortedSpendings = getSortedSpendings(filteredSpendings);

  return (
    <>
      <FiltersAndOrderings
        setCurrencyFilter={setCurrencyFilter}
        currencyFilter={currencyFilter}
        setSorting={setSorting}
      />
      {sortedSpendings.map((spending: SpendingDB) => (
        <Spending key={spending.id} data-testid="spending-record">
          <IconWrapper>
            <FiDollarSign color="var(--color-blue)" />
          </IconWrapper>
          <TextWrapper>
            <h3>{spending.description}</h3>
            <p>
              {DateTime.fromISO(spending.spent_at).toFormat(
                "t - MMMM dd, yyyy"
              )}
            </p>
          </TextWrapper>
          <AmountWrapper>
            <Amount currency={spending.currency}>{spending.amount}</Amount>
          </AmountWrapper>
        </Spending>
      ))}
    </>
  );
};
