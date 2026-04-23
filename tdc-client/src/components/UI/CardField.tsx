import React from "react";
import { Container, Label, Value } from "./CardField.styled";

export type CardFieldProps = {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
};
export default function CardField({ ...props }: CardFieldProps) {
  return (
    <Container>
      <Label>{props.label}</Label>
      <Value>{props.children !== undefined ? props.children : props.value || "-"}</Value>
    </Container>
  );
}
