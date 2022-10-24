import React from "react";
import { LoaderStyles, LdsDualRing } from "../styles/ComponentStyles";

export default function Loader() {
  return (
    <>
      <LoaderStyles data-testid="loading-state">
        <LdsDualRing color={"var(--color-blue)"} />
      </LoaderStyles>
    </>
  );
}
