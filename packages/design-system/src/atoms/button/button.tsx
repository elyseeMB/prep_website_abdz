import React from "react";

type Props = {
  primary?: boolean;
  label: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
};

export function Button({ primary = false, label, backgroundColor }: Props) {
  const mode = primary ? "btn-primary" : "btn-secondary";

  const style: React.HTMLAttributes<HTMLElement>["style"] = {
    backgroundColor,
  };
  return (
    <button style={style} className={["btn", mode].join(" ")}>
      {" "}
      {label}{" "}
    </button>
  );
}
