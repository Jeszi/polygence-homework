import React, { useState } from "react";
import { DateTime } from "luxon";

import { InputStyles, Button } from "../styles/InputStyles";
import { SelectStyles } from "../styles/SelectStyles";
import { FormStyles } from "../styles/ComponentStyles";

import { useSpendings } from "../hooks/useSpendings";

interface FormState {
  description: string;
  amount: any;
  currency: string;
}

export const Form: React.FC = () => {
  const { addSpending } = useSpendings();

  const [state, setState] = useState<FormState>({
    description: "",
    amount: 0,
    currency: "USD",
  });

  const [errors, setErrors] = useState<string[]>([]);

  function validateFields() {
    if (state.description === "") {
      setErrors((prevErrors) => [...prevErrors, "description"]);
    }

    if (state.amount === "" || state.amount === 0) {
      setErrors((prevErrors) => [...prevErrors, "amount"]);
    }
  }

  function isFieldsValid() {
    if (state.description === "") {
      return false;
    }

    if (state.amount === "" || state.amount === 0) {
      return false;
    }

    return true;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setErrors([]);
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSave() {
    if (isFieldsValid()) {
      addSpending({
        amount: state.amount,
        currency: state.currency,
        description: state.description,
        spent_at: DateTime.now().toString(),
      });
      setState({
        ...state,
        description: "",
        amount: 0,
      });
      setErrors([]);
    } else {
      validateFields();
    }
  }

  function getError(value: string) {
    return errors.includes(value);
  }

  return (
    <>
      <FormStyles>
        <InputStyles
          data-testid="description-input"
          type="text"
          placeholder="description"
          name="description"
          value={state.description}
          onChange={handleChange}
          isError={getError("description")}
        />
        <InputStyles
          data-testid="amount-input"
          type="number"
          placeholder="amount"
          name="amount"
          min={0}
          value={state.amount}
          onChange={handleChange}
          isError={getError("amount")}
        />
        <SelectStyles
          data-testid="currency-input"
          name="currency"
          value={state.currency}
          onChange={handleChange}
        >
          <option value="HUF">HUF</option>
          <option value="USD">USD</option>
        </SelectStyles>
        <Button data-testid="save-button" onClick={handleSave}>
          Save
        </Button>
      </FormStyles>
    </>
  );
};
