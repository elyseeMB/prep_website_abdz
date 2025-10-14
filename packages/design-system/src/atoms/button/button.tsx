import React, { MouseEventHandler, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  primary?: boolean;
  className?: string;
  label?: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  value?: number | null;
  variant?: "danger" | "success" | "info";
  icon?: (...args: any) => JSX.Element;
}>;

export function Button({
  onClick,
  children,
  className,
  value,
  primary = false,
  label,
  backgroundColor,
  variant,
  icon: IconElement,
}: Props) {
  const mode = primary ? "btn-primary" : "btn-secondary";

  const style: React.HTMLAttributes<HTMLElement>["style"] = {
    backgroundColor,
  };

  return (
    <button
      value={value ?? ""}
      onClick={onClick}
      style={style}
      className={["btn", variant === "danger", mode, className].join(" ")}
    >
      {IconElement && <IconElement width={20} height={20} />}
      {children}
    </button>
  );
}
