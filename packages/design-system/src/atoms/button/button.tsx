import "./button.css";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  primary?: boolean;
  className?: string;
  label?: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
}>;

export function Button({
  children,
  className,
  primary = false,
  label,
  type = "button",
  backgroundColor,
}: Props) {
  const mode = primary ? "btn-primary" : "btn-secondary";

  const style: React.HTMLAttributes<HTMLElement>["style"] = {
    backgroundColor,
  };
  return (
    <button
      type={type}
      style={style}
      className={["btn", mode, className].join(" ")}
    >
      {children}
    </button>
  );
}
