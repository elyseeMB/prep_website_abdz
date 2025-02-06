import React from "react";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export function FooterSection({ className, children }: Props) {
  return <section className={className}>{children}</section>;
}
