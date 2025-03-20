import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  primary?: boolean;
  className?: string;
  label?: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  value?: number | null;
  variant?: "danger" | "success" | "info";
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
      className={[
        "btn",
        variant === "danger" && "bg-red text-white",
        mode,
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
