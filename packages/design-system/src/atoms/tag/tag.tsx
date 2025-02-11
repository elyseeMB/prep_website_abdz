import { PropsWithChildren } from "react";

export function Tag({
  className,
  children = "tag",
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div
      className={[
        className,
        "relative flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_0_1px_rgba(124,124,124,0.17),_0_1.5px_2px_0_rgba(0,0,0,0.02)] rounded-full line-height-1 py-2px px-4 text-sm line-height-normal bg-none before:content-empty before:block before:w-8px before:h-8px before:rounded-full before:bg-green-5 hover:bg-gray-1 transition-200",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
