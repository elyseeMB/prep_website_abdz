import React, { FormEvent, PropsWithChildren } from "react";
import { Field } from "../field/field.tsx";
import { Button } from "../../atoms/button/button.tsx";

type Props = PropsWithChildren<{
  className?: string;
  onSubmit?: () => void;
}>;

export function Form({ onSubmit, className, children }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}

export function FormField({
  type = "input",
  name,
  children,
  ...props
}: PropsWithChildren<{
  name?: string;
  type?: string;
}> &
  React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Field type={type} name={name} {...props}>
      {children}
    </Field>
  );
}

export function FormPrimaryButton({
  children,
  className,
  ...props
}: PropsWithChildren<{
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}>) {
  return (
    <Button className={className} primary={true} {...props}>
      {children}
    </Button>
  );
}

export function FormSecondaryButton({
  children,
  className,
  ...props
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <Button className={className} primary={false} {...props}>
      {children}
    </Button>
  );
}

export function FormButton({
  children,
  className,
  ...props
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
}
