import styled from "styled-components";

interface InputStylesProps {
  isError?: boolean;
}

export const Button = styled.div`
  font-family: var(--font-family);
  border: none;
  padding: 10px 15px;
  max-height: 40px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  color: darkgray;
  background-color: #08b783;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0px);
  }
`;

export const InputStyles = styled.input<InputStylesProps>`
  font-family: var(--font-family);
  max-height: 40px;
  padding: 10px 15px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  color: darkgray;

  &:focus {
    border-radius: 8px;
    color: var(--color-blue);
  }

  &[type="text"] {
    flex: 1;
  }

  &[type="number"] {
    width: 150px;
  }

  &[type="submit"] {
    background-color: #08b783;
    color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0px);
    }
  }
  ${(props) => (props.isError ? `border: solid 1px red` : ``)}
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
