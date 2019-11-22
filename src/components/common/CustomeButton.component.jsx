import React from "react";
import styled from "styled-components";

export default function CustomeButton({
  children,
  css,
  handleClick,
  ...props
}) {
  return (
    <Button {...props} css={css} onClick={handleClick}>
      {children}
    </Button>
  );
}

const Button = styled.button``;
