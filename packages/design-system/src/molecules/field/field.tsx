import React, { ElementType, useMemo } from "react";

export const typeElement = ["input", "checkbox", "textarea"] as const;

type PropsType<T> = React.InputHTMLAttributes<T>;

type Props<T extends ElementType> = {
  name?: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
  onInput?: React.FormEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  component?: T | null;
  type?: (typeof typeElement)[number] | string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Field<T extends Props<"input" | "select" | "textarea">>({
  name,
  value,
  onInput,
  className,
  component = null,
  type = "input",
  children,
  ...props
}: T) {
  const FieldComponent = useMemo<ElementType>(() => {
    if (component) {
      return component;
    }
    switch (type) {
      case "textarea":
        return FieldTextarea;
      case "input":
        return FieldInput;
      case "checkbox":
        return FieldCheckbox;
      default:
        return FieldInput;
    }
  }, [component, type]);

  const attr: React.InputHTMLAttributes<HTMLInputElement> = {
    name,
    value,
    id: name,
    className,
    onInput,
    ...props,
  };

  return (
    <div>
      <FieldComponent {...attr} />
      {children && <label htmlFor={name}>{children}</label>}
    </div>
  );
}

export function FieldCheckbox(props?: PropsType<HTMLInputElement>) {
  return <input type="checkbox" {...props} />;
}

export function FieldInput(props?: PropsType<HTMLInputElement>) {
  return <input {...props} />;
}

export function FieldTextarea(props?: PropsType<HTMLTextAreaElement>) {
  return <textarea {...props}></textarea>;
}
